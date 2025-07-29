import { useEffect } from 'react';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function OAuthCallback() {
  const navigate = useNavigate();

  console.log('🔄 OAuth callback component mounted');

  useEffect(() => {
    // Set a fallback redirect in case something goes wrong
    const fallbackTimer = setTimeout(() => {
      console.log('⏰ Fallback redirect triggered after 30 seconds');
      navigate('/success');
    }, 30000);

    return () => clearTimeout(fallbackTimer);
  }, [navigate]);

  return (
    <AuthenticateWithRedirectCallback 
      redirectUrl="/success"
      afterSignInUrl="/success"
      afterSignUpUrl="/success"
    />
  );
}
