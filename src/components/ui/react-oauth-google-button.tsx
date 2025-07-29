import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface GoogleUser {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  sub: string;
}

export default function ReactOAuthGoogleButton() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      console.log('✅ Google OAuth Success:', credentialResponse);
      
      // Decode the JWT credential to get user info
      const decoded = jwtDecode(credentialResponse.credential) as GoogleUser;
      
      console.log('🔄 Processing Google user via @react-oauth/google:', decoded.email);

      // Create/authenticate user using direct OAuth endpoint
      const response = await fetch('/api/direct-sso-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleUser: {
            email: decoded.email,
            firstName: decoded.given_name,
            lastName: decoded.family_name,
            profileImage: decoded.picture,
            googleId: decoded.sub,
          }
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Authentication successful:', result.user);
        
        // Store user data for success page
        sessionStorage.setItem('sso_user', JSON.stringify(result.user));
        
        // Navigate to success page
        navigate('/success');
      } else {
        const error = await response.json();
        console.error('❌ Authentication failed:', error);
        // The GoogleLogin component will handle error display
      }
    } catch (error) {
      console.error('❌ Error processing Google authentication:', error);
    }
  };

  const handleError = () => {
    console.error('❌ Google OAuth Error');
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        theme="outline"
        size="large"
        width={400}
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
      />
      
      {/* Instructions for when OAuth is not configured */}
      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
        <p className="text-yellow-800 font-medium">Google OAuth Setup Required</p>
        <p className="text-yellow-700 mt-1">
          If the button doesn't work, please check <code>GOOGLE_OAUTH_SETUP_GUIDE.md</code> for setup instructions.
        </p>
        <p className="text-yellow-600 text-xs mt-1">
          Current Client ID needs to be configured in Google Cloud Console with localhost:3008 as authorized origin.
        </p>
      </div>
    </div>
  );
}
