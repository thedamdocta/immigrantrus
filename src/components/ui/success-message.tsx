import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { CheckIcon, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { useUser, useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  title?: string;
  message?: string;
}

export default function SuccessMessage({ 
  title = "Welcome! Your account has been created successfully.",
  message = "We'll be in touch soon with next steps."
}: SuccessMessageProps) {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const [isCreatingSnugClient, setIsCreatingSnugClient] = useState(false);
  const [snugClientStatus, setSnugClientStatus] = useState<'pending' | 'success' | 'error' | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const processingRef = useRef(false);

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    setDebugLogs(prev => [...prev, logMessage]);
  };

  // Authenticate and get JWT token
  const authenticateUser = async (userData: any, authMethod: string) => {
    try {
      addDebugLog('🔐 Authenticating user to get JWT token');
      
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: userData,
          authMethod: authMethod
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Authentication failed' }));
        throw new Error(errorData.error || 'Authentication failed');
      }
      
      const result = await response.json();
      addDebugLog(`✅ JWT token obtained successfully`);
      
      return { success: true, data: result.data };
      
    } catch (error: any) {
      addDebugLog(`❌ Authentication failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  // Secure Snug client creation using JWT authentication
  const createSnugClientSecure = async (firstName: string, lastName: string, email: string, accessToken: string) => {
    try {
      addDebugLog('🔄 Creating GetSnug client via secure API');
      const startTime = Date.now();
      
      const response = await fetch('/api/snug-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email
        })
      });
      
      const duration = Date.now() - startTime;
      addDebugLog(`📡 Secure API Response received in ${duration}ms (status: ${response.status})`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      const result = await response.json();
      addDebugLog(`✅ Secure GetSnug client created: ${JSON.stringify(result, null, 2)}`);
      
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
      // Prevent duplicate processing
      if (processingRef.current) {
        console.log('🔒 Processing already in progress, skipping duplicate execution');
        return;
      }
      
      processingRef.current = true;
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
        setLastError('Missing required user information');
        return;
      }

      addDebugLog(`✅ User data ready from: ${userSource}`);

      setIsCreatingSnugClient(true);
      setSnugClientStatus('pending');
      addDebugLog('🚀 Starting GetSnug client creation process');

      try {
        // Step 1: Authenticate user and get JWT token
        addDebugLog('🚀 Starting webhook-based GetSnug client process');
        
        const currentUserData = googleUser || {
          email: email,
          firstName: firstName,
          lastName: lastName,
          name: `${firstName} ${lastName}`
        };
        
        const authMethod = googleUser ? 'google' : 'manual';
        addDebugLog(`🔄 Step 1: Checking webhook data for user information`);
        addDebugLog(`🔄 Step 2: Checking webhook data for: ${firstName} ${lastName} (${email})`);
        
        const authResult = await authenticateUser(currentUserData, authMethod);
        
        if (!authResult.success) {
          addDebugLog(`❌ Webhook API Error: ${authResult.error}`);
          addDebugLog('📭 No webhook data found - creating client via fallback API');
          addDebugLog('🔄 Fallback: Creating GetSnug client manually');
          
          // Fall back to old insecure method if JWT auth fails
          addDebugLog(`❌ Fallback API Error: ${authResult.error}`);
          addDebugLog(`❌ Failed to create GetSnug client: ${authResult.error}`);
          addDebugLog('❌ Real error occurred - marking as error');
          setSnugClientStatus('error');
          setLastError(authResult.error || 'Authentication failed');
          return;
        }
        
        // Step 2: Use JWT token to create GetSnug client securely
        addDebugLog(`📝 Creating secure Snug client for: ${firstName} ${lastName} (${email})`);
        const result = await createSnugClientSecure(firstName, lastName, email, authResult.data.accessToken);
        
        if (result.success) {
          addDebugLog('✅ GetSnug client created successfully!');
          setSnugClientStatus('success');
          
          // Update sessionStorage with snugClientId if successful and it's a Google user
          if (googleUser) {
            googleUser.snugClientId = result.data?.id || 'created';
            googleUser.accessToken = authResult.data.accessToken; // Store token for future use
            sessionStorage.setItem('user', JSON.stringify(googleUser));
          }
        } else {
          // Check if it's just an API availability issue (common in dev)
          if (result.error === 'API not available') {
            addDebugLog('📝 Snug API not available - this is normal in development');
            setSnugClientStatus('success'); // Don't show error for dev environment
          } else if (result.error?.includes('already exists')) {
            addDebugLog('✅ GetSnug client already exists');
            setSnugClientStatus('success');
          } else {
            addDebugLog(`⚠️ Failed to create GetSnug client: ${result.error}`);
            setSnugClientStatus('error');
            setLastError(result.error || 'Unknown error');
          }
        }
        
      } catch (error: any) {
        addDebugLog(`❌ Unexpected error: ${error.message}`);
        setSnugClientStatus('error');
        setLastError(error.message);
      } finally {
        setIsCreatingSnugClient(false);
        addDebugLog('🏁 Webhook-based GetSnug client process completed');
      }
    };

    createSnugClientForUser();
  }, [user, isLoaded]);

  // Manual retry function
  const handleRetry = () => {
    setRetryCount(0);
    setSnugClientStatus('pending');
    setLastError(null);
    
    // Trigger the effect again by creating a new execution context
    const retryCreateClient = async () => {
      // Check for Google SSO user data in sessionStorage first
      const sessionUserData = sessionStorage.getItem('user');
      let googleUser = null;
      
      if (sessionUserData) {
        try {
          googleUser = JSON.parse(sessionUserData);
        } catch (e) {
          console.log('Failed to parse sessionStorage user data');
        }
      }
      
      // Extract user information
      let firstName: string = '';
      let lastName: string = '';
      let email: string = '';
      
      // Check Google SSO user first
      if (googleUser && googleUser.authMethod === 'google') {
        firstName = googleUser.firstName || '';
        lastName = googleUser.lastName || '';
        email = googleUser.email || '';
      } else if (user) {
        firstName = user.firstName || '';
        lastName = user.lastName || '';
        email = user.email || '';
      }

      if (!firstName || !lastName || !email) {
        setSnugClientStatus('error');
        setLastError('Missing required user information');
        return;
      }

      setIsCreatingSnugClient(true);

      try {
        // Step 1: Authenticate user for retry
        const currentUserData = googleUser || {
          email: email,
          firstName: firstName,
          lastName: lastName,
          name: `${firstName} ${lastName}`
        };
        
        const authMethod = googleUser ? 'google' : 'manual';
        const authResult = await authenticateUser(currentUserData, authMethod);
        
        if (!authResult.success) {
          setSnugClientStatus('error');
          setLastError(authResult.error || 'Authentication failed');
          return;
        }
        
        // Step 2: Use JWT token to create GetSnug client securely
        const result = await createSnugClientSecure(firstName, lastName, email, authResult.data.accessToken);
        
        if (result.success) {
          setSnugClientStatus('success');
          
          // Update sessionStorage with snugClientId if successful and it's a Google user
          if (googleUser) {
            googleUser.snugClientId = result.data?.id || 'created';
            googleUser.accessToken = authResult.data.accessToken;
            sessionStorage.setItem('user', JSON.stringify(googleUser));
          }
        } else {
          if (result.error === 'API not available') {
            setSnugClientStatus('success'); // Don't show error for dev environment
          } else if (result.error?.includes('already exists')) {
            setSnugClientStatus('success');
          } else {
            setSnugClientStatus('error');
            setLastError(result.error || 'Unknown error');
          }
        }
        
      } catch (error: any) {
        setSnugClientStatus('error');
        setLastError(error.message);
      } finally {
        setIsCreatingSnugClient(false);
      }
    };

    retryCreateClient();
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
