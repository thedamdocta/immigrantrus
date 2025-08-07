import { useEffect } from 'react'

export default function StaffPortalPage() {
  useEffect(() => {
    // Redirect directly to the TwentyCRM build to avoid iframe routing issues
    console.log('🚀 Redirecting to Staff Portal - TwentyCRM')
    window.location.href = '/staff-portal/'
  }, [])

  // Show loading while redirecting
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Staff Portal...</p>
      </div>
    </div>
  )
}
