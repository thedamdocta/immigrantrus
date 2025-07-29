import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, CheckIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SnugApiService } from "@/lib/snugApi";
import SimpleGoogleSSO from "@/components/ui/simple-google-sso";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });

  // Validation error messages keyed by field name
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Basic client-side validation rules
  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.terms) newErrors.terms = "You must accept the terms";
    return newErrors;
  };

  // Create Snug client helper function using server-side API
  const createSnugClient = async (firstName: string, lastName: string, email: string) => {
    try {
      console.log("Creating Snug client via server API...");
      // Use the correct API endpoint - in production this will be the Vercel API route
      const apiUrl = import.meta.env.PROD 
        ? '/api/snug-client' 
        : 'http://localhost:3002/api/snug-client';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log("Snug client created successfully:", result);
      } else {
        const errorData = await response.json();
        console.error("Failed to create Snug client:", errorData);
      }
    } catch (error) {
      console.error("Failed to create Snug client:", error);
      // Don't throw error - we don't want to block user registration if Snug fails
    }
  };

  // Handle manual form submission with custom auth
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      console.log("Creating account with custom auth system:", formData);
      
      // Sign in the user with our custom auth system
      signIn({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        authMethod: 'manual' as const
      });

      // Create Snug client
      await createSnugClient(formData.firstName, formData.lastName, formData.email);
      
      // Navigate to success page
      navigate("/success");
      
    } catch (error: any) {
      console.error("Sign-up error:", error);
      setErrors({ 
        general: error.message || "Failed to create account. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-md">
      <Card className="border-none shadow-lg pb-0">
        <CardHeader className="flex flex-col items-center space-y-1 md:space-y-1 pb-3 md:pb-3 pt-4 md:pt-4">
          <div className="w-10 h-10 md:w-10 md:h-10 rounded-full bg-lawfirm-accent/10 flex items-center justify-center">
            <Eye className="h-5 w-5 md:h-5 md:w-5 text-lawfirm-accent" />
          </div>
          <div className="space-y-0.5 flex flex-col items-center">
            <h2 className="text-xl md:text-lg font-semibold text-foreground">Create an account</h2>
            <p className="text-sm md:text-sm text-muted-foreground">Welcome! Create an account to get started.</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 md:px-6">
          {/* General error message */}
          {errors.general && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md mb-6">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4">
            <div className="grid grid-cols-2 gap-3 md:gap-3">
              <div className="space-y-1 md:space-y-1">
                <Label htmlFor="firstName" className="text-sm">First name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  className="h-9 md:h-9"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                {errors.firstName && <p className="text-xs md:text-xs text-destructive">{errors.firstName}</p>}
              </div>
              <div className="space-y-1 md:space-y-1">
                <Label htmlFor="lastName" className="text-sm">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  className="h-9 md:h-9"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                {errors.lastName && <p className="text-xs md:text-xs text-destructive">{errors.lastName}</p>}
              </div>
            </div>


            <div className="space-y-1 md:space-y-1">
              <Label htmlFor="email" className="text-sm">Email address</Label>
              <Input
                id="email"
                placeholder="Email address"
                type="email"
                className="h-9 md:h-9"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-xs md:text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1 md:space-y-1">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className="pr-10 h-9 md:h-9"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 md:h-9 px-3 text-muted-foreground hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-xs md:text-xs text-destructive mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => setFormData({ ...formData, terms: Boolean(checked) })}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the <a className="text-primary hover:underline" href="#">Terms</a> and{' '}
                <a className="text-primary hover:underline" href="#">Conditions</a>
              </label>
              {errors.terms && <p className="text-sm text-destructive ml-2">{errors.terms}</p>}
            </div>

            <Button type="submit" className="w-full bg-primary text-white" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create free account"}
            </Button>

            {/* Direct Google OAuth - Bypasses Clerk's hosted flow */}
            <>
              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <SimpleGoogleSSO />
            </>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t !py-4">
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="#" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
