import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '507536406851-bvnr7qvl7j0b9jh2khr3oqjlhcotj3cs.apps.googleusercontent.com';

interface GoogleUser {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  sub: string;
}

export default function GoogleSSOButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleSSO = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Starting Google SSO with client ID:', GOOGLE_CLIENT_ID);
      
      // Load Google API script if not already loaded
      if (!window.google) {
        console.log('📥 Loading Google API...');
        await loadGoogleAPI();
      }

      // Initialize Google Sign-In with better error handling
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        ux_mode: 'popup',
        itp_support: true,
      });

      // Show the One Tap dialog
      window.google.accounts.id.prompt((notification: any) => {
        console.log('📱 Google One Tap notification:', notification);
        
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('🔄 One Tap not displayed, trying popup...');
          
          // Fallback to OAuth popup
          const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: GOOGLE_CLIENT_ID,
            scope: 'email profile openid',
            callback: handleOAuthResponse,
            error_callback: (error: any) => {
              console.error('❌ OAuth error:', error);
              setError('Authentication failed. Please try again.');
              setIsLoading(false);
            }
          });
          
          tokenClient.requestAccessToken({
            prompt: 'consent'
          });
        }
      });

    } catch (error) {
      console.error('❌ Google SSO initialization error:', error);
      setError('Failed to initialize Google authentication. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleResponse = async (response: any) => {
    try {
      // Decode the JWT token to get user info
      const userInfo = JSON.parse(atob(response.credential.split('.')[1]));
      await processGoogleUser(userInfo);
    } catch (error) {
      console.error('Error processing Google response:', error);
      setIsLoading(false);
    }
  };

  const handleOAuthResponse = async (response: any) => {
    try {
      // Fetch user info using access token
      const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`);
      const userInfo = await userInfoResponse.json();
      await processGoogleUser(userInfo);
    } catch (error) {
      console.error('Error processing OAuth response:', error);
      setIsLoading(false);
    }
  };

  const processGoogleUser = async (googleUser: GoogleUser) => {
    try {
      console.log('🔄 Processing Google user via direct OAuth:', googleUser.email);

      // Create/authenticate user using direct OAuth endpoint (no Clerk)
      const response = await fetch('/api/direct-sso-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleUser: {
            email: googleUser.email,
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            profileImage: googleUser.picture,
            googleId: googleUser.sub,
          }
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Direct OAuth authentication successful:', result.user);
        
        // Store user data for success page
        sessionStorage.setItem('sso_user', JSON.stringify(result.user));
        
        // Navigate to success page
        navigate('/success');
      } else {
        const error = await response.json();
        console.error('❌ Direct OAuth authentication failed:', error);
        setError(`Authentication failed: ${error.error || 'Unknown error'}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('❌ Direct OAuth processing error:', error);
      setError('Network error during authentication. Please try again.');
      setIsLoading(false);
    }
  };

  const loadGoogleAPI = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('google-api-script')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-api-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google API'));
      document.head.appendChild(script);
    });
  };

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="outline"
        className="w-full border-2 py-3 text-sm font-medium"
        onClick={handleGoogleSSO}
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
      
      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="text-xs text-red-500 hover:text-red-700 underline mt-1"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: any;
  }
}
