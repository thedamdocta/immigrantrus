import * as React from "react";
import { useEffect, useState } from "react";
import { CheckIcon, Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SnugApiService } from "@/lib/snugApi";

interface SuccessMessageProps {
  title?: string;
  message?: string;
}

export default function SuccessMessage({ 
  title = "Welcome! Your account has been created successfully.",
  message = "We'll be in touch soon with next steps."
}: SuccessMessageProps) {
  const { user, isLoaded } = useUser();
  const [isCreatingSnugClient, setIsCreatingSnugClient] = useState(false);
  const [snugClientStatus, setSnugClientStatus] = useState<'pending' | 'success' | 'error' | null>(null);

  // Create Snug client for all users who don't have one yet
  useEffect(() => {
    const createSnugClientForOAuthUser = async () => {
      console.log('SuccessMessage useEffect running...', { isLoaded, user: !!user });
      
      if (!isLoaded) {
        console.log('Clerk not loaded yet, waiting...');
        return;
      }
      
      if (!user) {
        console.log('No user found, skipping Snug client creation');
        setSnugClientStatus('success'); // Set to success so no loading indicators show
        return;
      }

      // Extract user information
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';
      const email = user.emailAddresses?.[0]?.emailAddress || '';

      console.log('User data extracted:', { firstName, lastName, email, userCreatedAt: user.createdAt });

      if (!firstName || !lastName || !email) {
        console.error('Missing required user data for Snug client creation');
        setSnugClientStatus('error');
        return;
      }

      setIsCreatingSnugClient(true);
      setSnugClientStatus('pending');

      try {
        const snugService = new SnugApiService();
        
        console.log(`🔄 Attempting to create Snug client for: ${firstName} ${lastName} (${email})`);
        
        const clientData = SnugApiService.createDefaultClientData(firstName, lastName, email);
        const result = await snugService.createClient(clientData);
        
        console.log('✅ Snug client created successfully:', result);
        setSnugClientStatus('success');
      } catch (error: any) {
        console.error('❌ Failed to create Snug client:', error);
        
        // Check if error is due to client already existing
        if (error.message && (error.message.includes('already exists') || error.message.includes('duplicate'))) {
          console.log('✅ Snug client already exists - this is expected');
          setSnugClientStatus('success');
        } else {
          console.log('❌ Real error occurred:', error.message);
          setSnugClientStatus('error');
        }
      } finally {
        setIsCreatingSnugClient(false);
      }
    };

    createSnugClientForOAuthUser();
  }, [user, isLoaded]);

  return (
    <div className="w-full max-w-md">
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-4 pb-4 pt-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            {isCreatingSnugClient ? (
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            ) : (
              <CheckIcon className="h-8 w-8 text-green-600" />
            )}
          </div>
          <div className="space-y-2 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
            <p className="text-muted-foreground">{message}</p>
            
            {/* Snug client status indicator */}
            {isCreatingSnugClient && (
              <p className="text-sm text-blue-600">Setting up your client profile...</p>
            )}
            {snugClientStatus === 'error' && (
              <p className="text-sm text-orange-600">Note: Your account was created successfully. We'll complete your profile setup shortly.</p>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              You should receive a confirmation email shortly. If you have any questions, 
              please don't hesitate to contact our office.
            </p>
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-foreground">Forde & Associates Law Firm</p>
              <p className="text-sm text-muted-foreground">
                Contact: <a href="mailto:marlene@fordelaw.org" className="text-primary hover:underline">
                  marlene@fordelaw.org
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
