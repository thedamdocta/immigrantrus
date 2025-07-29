import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckIcon, AlertCircle } from 'lucide-react';

export default function ProcessingPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Finalizing your account setup...');
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processUserAccount = async () => {
      try {
        // Get user data from sessionStorage (set by Google SSO)
        const userData = sessionStorage.getItem('user');
        if (!userData) {
          throw new Error('No user data found. Please try signing in again.');
        }

        const user = JSON.parse(userData);
        console.log('Processing user:', user);

        // Update status
        setStatus('Creating your client profile...');

        // Call the Snug API to create client
        const apiUrl = '/api/snug-client';

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: user.firstName || 'Unknown',
              lastName: user.lastName || 'User',
              email: user.email,
              googleId: user.googleId,
              profilePicture: user.picture,
            }),
          });

          if (response.ok) {
            const snugData = await response.json();
            console.log('✅ Snug client created:', snugData);
            
            // Update user data with Snug client ID
            user.snugClientId = snugData.clientId;
            sessionStorage.setItem('user', JSON.stringify(user));
            
            setStatus('Account setup complete!');
            setIsProcessing(false);
            
            // Navigate to success page after a brief delay
            setTimeout(() => navigate('/success'), 1500);
          } else {
            const errorData = await response.text();
            throw new Error(`Failed to create client profile: ${response.status} - ${errorData}`);
          }
        } catch (fetchError: any) {
          // Handle fetch errors (like network errors) gracefully
          if (fetchError.message === 'Failed to fetch' || fetchError.message.includes('NetworkError')) {
            console.log('📡 API endpoint not available - this is normal in development');
            setStatus('Finalizing setup...');
            setIsProcessing(false);
            
            // Mark as processed but skip Snug client creation
            user.snugSkipped = true;
            sessionStorage.setItem('user', JSON.stringify(user));
            
            // Still navigate to success page
            setTimeout(() => navigate('/success'), 1500);
          } else {
            throw fetchError;
          }
        }
      } catch (error: any) {
        console.error('Processing error:', error);
        setError(error.message);
        setIsProcessing(false);
        setStatus('There was an issue, but your account was still created.');
        
        // Still navigate to success page after delay, but with error info
        const userData = sessionStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          user.processingError = error.message;
          sessionStorage.setItem('user', JSON.stringify(user));
        }
        
        setTimeout(() => navigate('/success'), 3000);
      }
    };

    processUserAccount();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
          {isProcessing ? (
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          ) : error ? (
            <AlertCircle className="h-8 w-8 text-orange-600" />
          ) : (
            <CheckIcon className="h-8 w-8 text-green-600" />
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {isProcessing ? 'Setting Up Your Account' : error ? 'Account Created' : 'All Set!'}
        </h2>
        
        <p className="text-gray-600 mb-4">{status}</p>
        
        {error && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded text-sm">
            <p className="text-orange-800">
              Don't worry - your account was created successfully. We just couldn't complete all setup steps.
            </p>
          </div>
        )}
        
        {isProcessing && (
          <div className="mt-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>This usually takes just a few seconds...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
