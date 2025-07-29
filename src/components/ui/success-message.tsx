import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { CheckIcon, Loader2, RefreshCw } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SnugApiService } from "@/lib/snugApi";

interface SuccessMessageProps {
  title?: string;
  message?: string;
}

export default function SuccessMessage({ 
  title = "Welcome! Your account has been created successfully.",
  message = "We'll be in touch soon with next steps."
}: SuccessMessageProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isCreatingSnugClient, setIsCreatingSnugClient] = useState(false);
  const [snugClientStatus, setSnugClientStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);

  // Enhanced client creation function with retry logic
  const createSnugClientForUser = useCallback(async (retryAttempt = 0) => {
    console.log(`🔄 Creating Snug client (attempt ${retryAttempt + 1})...`);
    
    if (!isLoaded) {
      console.log('⏳ Clerk not loaded yet, waiting...');
      return;
    }
    
    if (!isSignedIn || !user) {
      console.log('👻 No authenticated user found, skipping Snug client creation');
      setSnugClientStatus('success');
      return;
    }

    // Extract user information with better error handling
    const firstName = user.firstName?.trim() || '';
    const lastName = user.lastName?.trim() || '';
    const email = user.emailAddresses?.[0]?.emailAddress?.trim() || '';

    console.log('👤 User data extracted:', { 
      firstName, 
      lastName, 
      email, 
      userCreatedAt: user.createdAt,
      hasEmailAddresses: user.emailAddresses?.length > 0,
      emailCount: user.emailAddresses?.length 
    });

    // Validation with specific error messages
    if (!firstName || !lastName || !email) {
      const missingFields = [];
      if (!firstName) missingFields.push('firstName');
      if (!lastName) missingFields.push('lastName');
      if (!email) missingFields.push('email');
      
      const errorMsg = `Missing required user data: ${missingFields.join(', ')}`;
      console.error('❌', errorMsg);
      setLastError(errorMsg);
      setSnugClientStatus('error');
      return;
    }

    // Check environment variables
    const snugEmail = import.meta.env.VITE_SNUG_EMAIL;
    const snugPassword = import.meta.env.VITE_SNUG_PASSWORD;
    
    if (!snugEmail || !snugPassword) {
      const errorMsg = 'Missing VITE_SNUG_EMAIL or VITE_SNUG_PASSWORD environment variables';
      console.error('❌', errorMsg);
      setLastError(errorMsg);
      setSnugClientStatus('error');
      return;
    }

    setIsCreatingSnugClient(true);
    setSnugClientStatus('pending');
    setLastError(null);

    try {
      const snugService = new SnugApiService();
      
      console.log(`🚀 Creating Snug client for: ${firstName} ${lastName} (${email})`);
      
      const clientData = SnugApiService.createDefaultClientData(firstName, lastName, email);
      console.log('📤 Client data:', JSON.stringify(clientData, null, 2));
      
      const startTime = Date.now();
      const result = await snugService.createClient(clientData);
      const duration = Date.now() - startTime;
      
      console.log(`✅ Snug client created successfully in ${duration}ms:`, result);
      setSnugClientStatus('success');
      setRetryCount(0);
      
    } catch (error: any) {
      console.error('❌ Failed to create Snug client:', error);
      setLastError(error.message);
      
      // Check if error is due to client already existing (success case)
      if (error.message && (
        error.message.includes('already exists') || 
        error.message.includes('duplicate') ||
        error.message.includes('already has this role')
      )) {
        console.log('✅ Snug client already exists - treating as success');
        setSnugClientStatus('success');
        setLastError(null);
      } else {
        // Real error - attempt retry if under limit
        if (retryAttempt < 2) {
          console.log(`🔄 Retrying in 2 seconds... (attempt ${retryAttempt + 2})`);
          setRetryCount(retryAttempt + 1);
          setTimeout(() => {
            createSnugClientForUser(retryAttempt + 1);
          }, 2000);
        } else {
          console.log('❌ Max retries exceeded, marking as error');
          setSnugClientStatus('error');
        }
      }
    } finally {
      setIsCreatingSnugClient(false);
    }
  }, [user, isLoaded, isSignedIn]);

  // Create Snug client for all authenticated users
  useEffect(() => {
    // Add a small delay to ensure Clerk is fully loaded after OAuth redirect
    const timer = setTimeout(() => {
      createSnugClientForUser();
    }, 100);

    return () => clearTimeout(timer);
  }, [createSnugClientForUser]);

  // Manual retry function
  const handleRetry = () => {
    setRetryCount(0);
    createSnugClientForUser();
  };

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
            
            {/* Enhanced Snug client status indicators */}
            {isCreatingSnugClient && (
              <div className="space-y-1">
                <p className="text-sm text-blue-600">Setting up your client profile...</p>
                {retryCount > 0 && (
                  <p className="text-xs text-blue-500">Retry attempt {retryCount + 1}/3</p>
                )}
              </div>
            )}
            {snugClientStatus === 'success' && (
              <p className="text-sm text-green-600">✅ Client profile setup complete!</p>
            )}
            {snugClientStatus === 'error' && (
              <div className="space-y-2">
                <p className="text-sm text-orange-600">⚠️ Profile setup had issues (account still created)</p>
                {lastError && (
                  <p className="text-xs text-gray-500 max-w-xs break-words">
                    {lastError}
                  </p>
                )}
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                  className="text-xs px-3 py-1 h-auto"
                  disabled={isCreatingSnugClient}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              You should receive a confirmation email shortly. If you have any questions, 
              please don't hesitate to contact our office.
            </p>
            
            {/* Enhanced status information */}
            {snugClientStatus === 'success' && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
                Your legal documents profile has been created successfully with our legal team.
              </div>
            )}
            
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-foreground">Forde & Associates Law Firm</p>
            </div>
            
            {/* Link back to main site */}
            <div className="pt-4">
              <a 
                href="https://www.immigrantsrus.org/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors duration-200"
              >
                Visit Our Main Website
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
