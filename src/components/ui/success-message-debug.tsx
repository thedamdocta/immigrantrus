import * as React from "react";
import { useEffect, useState } from "react";
import { CheckIcon, Loader2, AlertCircle } from "lucide-react";
import { useUser, useAuth } from "../../contexts/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface SuccessMessageProps {
  title?: string;
  message?: string;
}

export default function SuccessMessageDebug({ 
  title = "Welcome! Your account has been created successfully.",
  message = "We'll be in touch soon with next steps."
}: SuccessMessageProps) {
  const { user, isLoaded } = useUser();
  const [isCreatingSnugClient, setIsCreatingSnugClient] = useState(false);
  const [snugClientStatus, setSnugClientStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    setDebugLogs(prev => [...prev, logMessage]);
  };

  // Direct Snug client creation for Google SSO users
  const createSnugClientDirect = async (firstName: string, lastName: string, email: string) => {
    try {
      addDebugLog('🔄 Creating GetSnug client directly');
      const startTime = Date.now();
      
      // Check if we have the Snug API credentials
      const snugEmail = import.meta.env.VITE_SNUG_EMAIL;
      const snugPassword = import.meta.env.VITE_SNUG_PASSWORD;
      
      if (!snugEmail || !snugPassword) {
        addDebugLog('⚠️ Missing VITE_SNUG_EMAIL or VITE_SNUG_PASSWORD - skipping Snug client creation');
        return { success: false, error: 'Missing Snug credentials' };
      }
      
      // Create the client data
      const clientData = {
        client_data: {
          full_name: `${firstName} ${lastName}`,
          contact_email: email,
          estate_plan_foundation: "will",
          value_of_assets: "up_to_five",
          household_state_code: "NY",
          show_household_onboarding_requirement: false,
          blended_family: false,
          children: "none"
        },
        client_role: {
          recommendation_trust: false,
          recommendation_will: true,
          recommendation_fpoa: false,
          recommendation_hcd: false,
          professional_pricing_option: "DEFAULT",
          block_will: false,
          block_trust: false
        }
      };
      
      addDebugLog(`📤 Client data prepared: ${JSON.stringify(clientData, null, 2)}`);
      
      // Use the Vercel API endpoint
      const apiUrl = '/api/snug-client';
      
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
      
      const duration = Date.now() - startTime;
      addDebugLog(`📡 API Response received in ${duration}ms (status: ${response.status})`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      addDebugLog(`✅ GetSnug client created successfully: ${JSON.stringify(result, null, 2)}`);
      
      return { success: true, data: result };
      
    } catch (error: any) {
      addDebugLog(`❌ Failed to create GetSnug client: ${error.message}`);
      
      // If it's a network error (fetch failed), just skip it
      if (error.message === 'Failed to fetch' || error.message.includes('NetworkError')) {
        addDebugLog('📡 API endpoint not available - this is normal in development');
        return { success: false, error: 'API not available' };
      }
      
      return { success: false, error: error.message };
    }
  };

  // Create Snug client for all users
  useEffect(() => {
    const createSnugClientForUser = async () => {
      addDebugLog('🔄 SuccessMessage useEffect triggered');
      
      // Check for Google SSO user data in sessionStorage first
      const sessionUserData = sessionStorage.getItem('user');
      let googleUser = null;
      
      if (sessionUserData) {
        try {
          googleUser = JSON.parse(sessionUserData);
          addDebugLog('🔍 Found Google SSO user data in sessionStorage');
          addDebugLog(`📊 Google user data: ${JSON.stringify(googleUser, null, 2)}`);
        } catch (e) {
          addDebugLog('❌ Failed to parse sessionStorage user data');
        }
      }
      
      // Extract user information
      let firstName: string = '';
      let lastName: string = '';
      let email: string = '';
      let userSource: string = 'unknown';
      let snugClientId: string | null = null;
      
      // Check Google SSO user first
      if (googleUser && googleUser.authMethod === 'google') {
        firstName = googleUser.firstName || '';
        lastName = googleUser.lastName || '';
        email = googleUser.email || '';
        snugClientId = googleUser.snugClientId || null;
        userSource = 'Google SSO';
        
        addDebugLog(`👤 Google SSO user data extracted:`);
        addDebugLog(`   - firstName: "${firstName}"`);
        addDebugLog(`   - lastName: "${lastName}"`);
        addDebugLog(`   - email: "${email}"`);
        addDebugLog(`   - googleId: ${googleUser.googleId}`);
        addDebugLog(`   - snugClientId: ${snugClientId}`);
        
        // If Snug client was already created, we're done
        if (snugClientId) {
          addDebugLog('✅ Snug client already created during SSO');
          setSnugClientStatus('success');
          return;
        }
      } else if (user) {
        // Fall back to custom auth system
        firstName = user.firstName || '';
        lastName = user.lastName || '';
        email = user.email || '';
        userSource = 'Custom auth system';

        addDebugLog(`👤 Custom auth user data extracted:`);
        addDebugLog(`   - firstName: "${firstName}"`);
        addDebugLog(`   - lastName: "${lastName}"`);
        addDebugLog(`   - email: "${email}"`);
        addDebugLog(`   - userId: ${user.id}`);
      } else if (!isLoaded) {
        addDebugLog('⏳ Auth not loaded yet, waiting...');
        return;
      } else {
        addDebugLog('👻 No authenticated user found');
        setSnugClientStatus('success'); // Just mark as success if no user
        return;
      }

      // Validate user data
      if (!firstName || !lastName || !email) {
        addDebugLog('❌ Missing required user data - skipping Snug client creation');
        setSnugClientStatus('error');
        return;
      }

      addDebugLog(`✅ User data ready from: ${userSource}`);

      setIsCreatingSnugClient(true);
      setSnugClientStatus('pending');
      addDebugLog('🚀 Starting GetSnug client creation process');

      try {
        // For Google SSO users, skip webhook checks and create directly
        if (userSource === 'Google SSO') {
          addDebugLog('📝 Google SSO user - creating Snug client directly');
          const result = await createSnugClientDirect(firstName, lastName, email);
          
          if (result.success) {
            addDebugLog('✅ GetSnug client created successfully!');
            setSnugClientStatus('success');
            
            // Update sessionStorage with snugClientId if successful
            if (googleUser) {
              googleUser.snugClientId = result.data?.id || 'created';
              sessionStorage.setItem('user', JSON.stringify(googleUser));
            }
          } else {
            // Check if it's just an API availability issue (common in dev)
            if (result.error === 'API not available' || result.error === 'Missing Snug credentials') {
              addDebugLog('📝 Snug API not available - this is normal in development');
              setSnugClientStatus('success'); // Don't show error for dev environment
            } else if (result.error?.includes('already exists')) {
              addDebugLog('✅ GetSnug client already exists');
              setSnugClientStatus('success');
            } else {
              addDebugLog(`⚠️ Failed to create GetSnug client: ${result.error}`);
              setSnugClientStatus('error');
            }
          }
        } else {
          // For non-Google SSO users, you might want to use a different flow
          addDebugLog('📝 Non-Google SSO user - skipping Snug client creation');
          setSnugClientStatus('success');
        }
        
      } catch (error: any) {
        addDebugLog(`❌ Unexpected error: ${error.message}`);
        setSnugClientStatus('error');
      } finally {
        setIsCreatingSnugClient(false);
        addDebugLog('🏁 GetSnug client process completed');
      }
    };

    createSnugClientForUser();
  }, [user, isLoaded]);

  return (
    <div className="w-full max-w-md">
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-4 pb-4 pt-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            {isCreatingSnugClient ? (
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            ) : snugClientStatus === 'error' ? (
              <AlertCircle className="h-8 w-8 text-orange-600" />
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
            {snugClientStatus === 'success' && !isCreatingSnugClient && (
              <p className="text-sm text-green-600">✅ Registration complete!</p>
            )}
            {snugClientStatus === 'error' && !isCreatingSnugClient && (
              <p className="text-sm text-orange-600">⚠️ Profile setup had issues (account still created)</p>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              You should receive a confirmation email shortly. If you have any questions, 
              please don't hesitate to contact our office.
            </p>
            
            {/* Debug toggle button */}
            <div className="pt-2">
              <button 
                onClick={() => setShowDebug(!showDebug)}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                {showDebug ? 'Hide' : 'Show'} Debug Logs
              </button>
            </div>
            
            {/* Debug logs */}
            {showDebug && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md text-left">
                <h4 className="text-sm font-medium mb-2">Debug Logs:</h4>
                <div className="text-xs font-mono space-y-1 max-h-64 overflow-y-auto">
                  {debugLogs.map((log, index) => (
                    <div key={index} className="break-all">
                      {log}
                    </div>
                  ))}
                </div>
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
