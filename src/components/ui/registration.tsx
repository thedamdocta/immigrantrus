import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, CheckIcon } from "lucide-react";
import { useSignUp, useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SnugApiService } from "@/lib/snugApi";

// Check if Clerk is available
const hasValidClerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY && 
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY !== 'pk_test_your_key_here' && 
  (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith('pk_test_') || 
   import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith('pk_live_'))

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
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

  // Create Snug client helper function
  const createSnugClient = async (firstName: string, lastName: string, email: string) => {
    try {
      const snugService = new SnugApiService();
      const clientData = SnugApiService.createDefaultClientData(firstName, lastName, email);
      await snugService.createClient(clientData);
      console.log("Snug client created successfully");
    } catch (error) {
      console.error("Failed to create Snug client:", error);
      // Don't throw error - we don't want to block user registration if Snug fails
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    if (!signIn) return;
    
    setIsLoading(true);
    try {
      // Use the correct Clerk OAuth approach
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: window.location.origin + "/success",
        redirectUrlComplete: window.location.origin + "/success"
      });
      // This code won't execute due to redirect
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrors({ general: "Failed to sign in with Google. Please try again." });
      setIsLoading(false);
    }
  };

  // Handle manual form submission
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
      if (hasValidClerkKey && signUp) {
        // Full Clerk integration
        const result = await signUp.create({
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailAddress: formData.email,
          password: formData.password,
        });

        // Send verification email
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

        // Set the session as active (auto-verify for now)
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          
          // Create Snug client
          await createSnugClient(formData.firstName, formData.lastName, formData.email);
          
          // Navigate to success page
          navigate("/success");
        }
      } else {
        // Demo mode - just create Snug client and redirect
        console.log("Demo mode: Creating account", formData);
        
        // Create Snug client
        await createSnugClient(formData.firstName, formData.lastName, formData.email);
        
        // Navigate to success page
        navigate("/success");
      }
    } catch (error: any) {
      console.error("Sign-up error:", error);
      setErrors({ 
        general: error.errors?.[0]?.message || "Failed to create account. Please try again." 
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
          {/* Demo mode notice */}
          {!hasValidClerkKey && (
            <div className="p-3 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md mb-6">
              <strong>Demo Mode:</strong> Google SSO requires Clerk configuration. Manual form registration will create a Snug client.
            </div>
          )}

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

            {/* Google Sign-In Button - only show if Clerk is configured */}
            {hasValidClerkKey && (
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

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 py-3 text-sm font-medium"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </Button>
              </>
            )}
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
