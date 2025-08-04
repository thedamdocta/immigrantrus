import { useEffect } from 'react'

export default function StaffPortalPage() {
  useEffect(() => {
    // Redirect to the static TwentyCRM build
    console.log('🚀 App running with native Google Sign-In')
    window.location.href = '/staff-portal/'
  }, [])

  // Show a minimal loading state while redirecting
  return (
    <div className="min-h-screen bg-lawfirm-secondaryBackground flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lawfirm-accent mx-auto mb-4"></div>
        <h1 className="text-2xl font-serif text-lawfirm-text mb-2">Loading Staff Portal...</h1>
        <p className="text-lawfirm-subtext">Initializing TwentyCRM system</p>
      </div>
    </div>
  )
}
