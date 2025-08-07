import { useEffect, useState } from 'react'

export default function StaffPortalPage() {
  const [status, setStatus] = useState('initializing')
  const [error, setError] = useState('')

  useEffect(() => {
    const initializeStaffPortal = async () => {
      try {
        console.log('🚀 Initializing Staff Portal - TwentyCRM')
        setStatus('checking_backend')

        // Check if TwentyCRM backend is ready
        const healthCheck = await fetch('/api/health')
        const health = await healthCheck.json()
        
        if (health.services?.twentycrm === 'running') {
          setStatus('redirecting')
          console.log('✅ TwentyCRM backend is ready, redirecting...')
          
          // Redirect to TwentyCRM frontend
          window.location.href = '/staff-portal/'
        } else {
          setStatus('starting')
          console.log('⏳ TwentyCRM backend is starting, waiting...')
          
          // Wait a bit and try again
          setTimeout(initializeStaffPortal, 3000)
        }
      } catch (error) {
        console.error('❌ Staff Portal initialization error:', error)
        setError('Unable to connect to CRM backend. Please try again.')
        setStatus('error')
      }
    }

    initializeStaffPortal()
  }, [])

  const getStatusMessage = () => {
    switch (status) {
      case 'initializing':
        return 'Initializing Staff Portal...'
      case 'checking_backend':
        return 'Checking CRM backend status...'
      case 'starting':
        return 'Starting TwentyCRM backend...'
      case 'redirecting':
        return 'Redirecting to Staff Portal...'
      case 'error':
        return error
      default:
        return 'Loading Staff Portal...'
    }
  }

  const handleRetry = () => {
    setStatus('initializing')
    setError('')
    window.location.reload()
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        {status !== 'error' ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        ) : (
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
        )}
        
        <p className="text-gray-600 mb-4">{getStatusMessage()}</p>
        
        {status === 'starting' && (
          <p className="text-sm text-gray-500">
            This may take a few moments while the CRM backend starts up...
          </p>
        )}
        
        {status === 'error' && (
          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
