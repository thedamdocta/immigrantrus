import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const REDIRECT_URI = `${window.location.origin}/oauth-success`;

// Check if Google OAuth is properly configured
const isGoogleOAuthConfigured = GOOGLE_CLIENT_ID && 
  GOOGLE_CLIENT_ID !== 'your-google-client-id' && 
  GOOGLE_CLIENT_ID.includes('.apps.googleusercontent.com');

export default function DirectGoogleOAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleOAuth = () => {
    if (!isGoogleOAuthConfigured) {
      alert(`Google OAuth Setup Required:

1. Go to Google Cloud Console (console.cloud.google.com)
2. Create a new project or select existing project
3. Enable Google+ API and Gmail API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set Application type to "Web application"
6. Add Authorized redirect URI: ${REDIRECT_URI}
7. Copy the Client ID to .env.local as VITE_GOOGLE_CLIENT_ID
8. Copy the Client Secret to .env.local as GOOGLE_CLIENT_SECRET

Current redirect URI: ${REDIRECT_URI}
Current Client ID: ${GOOGLE_CLIENT_ID || 'Not set'}`);
      return;
    }

    setIsLoading(true);
    
    // Direct Google OAuth without Clerk
    const googleAuthUrl = new URL('https://accounts.google.com/oauth/authorize');
    googleAuthUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
    googleAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', 'openid profile email');
    googleAuthUrl.searchParams.set('access_type', 'offline');
    googleAuthUrl.searchParams.set('prompt', 'consent');
    
    // Store state to prevent CSRF attacks
    const state = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('oauth_state', state);
    googleAuthUrl.searchParams.set('state', state);
    
    console.log('🚀 Starting direct Google OAuth flow');
    console.log('Redirect URL:', REDIRECT_URI);
    
    // Redirect to Google OAuth
    window.location.href = googleAuthUrl.toString();
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full border-2 py-3 text-sm font-medium"
      onClick={handleGoogleOAuth}
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
      {isLoading ? "Redirecting to Google..." : "Continue with Google (Direct)"}
    </Button>
  );
}
