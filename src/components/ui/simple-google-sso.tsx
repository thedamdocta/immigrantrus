import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the Google response types
interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
  clientId: string;
}

interface DecodedToken {
  email: string;
  given_name: string;
  family_name: string;
  name: string;
  picture: string;
  sub: string;
}

// Simple JWT decode function
function parseJwt(token: string): DecodedToken {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export default function SimpleGoogleSSO() {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Google Sign-In
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
          callback: handleGoogleCallback,
        });

        // Render the button
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          {
            theme: 'outline',
            size: 'large',
            width: 400, // Use numeric value instead of percentage
            text: 'continue_with',
          }
        );
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleCallback = async (response: GoogleCredentialResponse) => {
    try {
      console.log('✅ Google Sign-In Success');
      console.log('Response:', response);
      
      // Decode the JWT to get user info
      const userInfo = parseJwt(response.credential);
      console.log('User info:', userInfo);

      // Store user data in sessionStorage
      sessionStorage.setItem('user', JSON.stringify({
        email: userInfo.email,
        firstName: userInfo.given_name || 'Unknown',
        lastName: userInfo.family_name || 'User',
        name: userInfo.name,
        picture: userInfo.picture,
        authMethod: 'google',
        googleId: userInfo.sub,
      }));

      // Navigate to processing page for Snug client creation
      navigate('/processing');
    } catch (error) {
      console.error('❌ Error handling Google sign-in:', error);
      
      // Still try to navigate to processing page with error info
      sessionStorage.setItem('user', JSON.stringify({
        email: 'unknown',
        firstName: 'Error',
        lastName: 'User',
        name: 'Error User',
        picture: null,
        authMethod: 'google',
        googleId: null,
        error: String(error),
      }));
      
      navigate('/processing');
    }
  };

  return (
    <div className="w-full">
      <div id="google-signin-button"></div>
      
      {/* Fallback message if Google Client ID is not configured */}
      {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded text-sm">
          <p className="text-red-800 font-medium">Google OAuth Not Configured</p>
          <p className="text-red-700 mt-1">
            Please set up Google OAuth credentials in Google Cloud Console and add the client ID to your .env.local file.
          </p>
        </div>
      )}
    </div>
  );
}
