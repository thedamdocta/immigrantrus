import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckIcon, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function OAuthSuccessPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [status, setStatus] = useState('Processing OAuth response...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        // Check for OAuth errors
        if (error) {
          console.error('OAuth error:', error);
          setStatus(`OAuth error: ${error}`);
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        // Verify state to prevent CSRF attacks
        const storedState = sessionStorage.getItem('oauth_state');
        if (!state || state !== storedState) {
          console.error('Invalid state parameter');
          setStatus('Security check failed. Please try again.');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        // Clear stored state
        sessionStorage.removeItem('oauth_state');

        if (!code) {
          console.error('No authorization code received');
          setStatus('Authorization failed. Please try again.');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        console.log('✅ OAuth authorization code received');
        setStatus('Exchanging authorization code for user data...');

        // Exchange authorization code for user data via our backend
        const response = await fetch('/api/google-oauth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });

        if (!response.ok) {
          throw new Error(`OAuth exchange failed: ${response.status}`);
        }

        const userData = await response.json();
        console.log('✅ User data received:', userData);

        // Sign in the user with our custom auth system
        signIn({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          name: userData.name,
          picture: userData.picture,
          authMethod: 'google' as const
        });

        // Store user data for the success page (for backward compatibility)
        sessionStorage.setItem('oauth_user_data', JSON.stringify(userData));

        setStatus('Account created successfully! Redirecting...');
        setIsLoading(false);
        
        // Redirect to success page
        setTimeout(() => navigate('/success'), 1500);

      } catch (error: any) {
        console.error('OAuth callback error:', error);
        setStatus(`Error: ${error.message}`);
        setIsLoading(false);
        setTimeout(() => navigate('/'), 5000);
      }
    };

    handleOAuthCallback();
  }, [navigate, signIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          ) : status.includes('Error') ? (
            <AlertCircle className="h-8 w-8 text-red-600" />
          ) : (
            <CheckIcon className="h-8 w-8 text-green-600" />
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {isLoading ? 'Processing...' : status.includes('Error') ? 'Authentication Failed' : 'Success!'}
        </h2>
        <p className="text-gray-600">{status}</p>
        {!isLoading && (
          <div className="mt-4 text-sm text-gray-500">
            You will be redirected automatically...
          </div>
        )}
      </div>
    </div>
  );
}
