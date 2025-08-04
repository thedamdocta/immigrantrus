import { useEffect } from 'react'

export default function StaffPortalPage() {
  const crmUrl = 'http://localhost:3000'

  useEffect(() => {
    // Redirect immediately to the CRM system
    console.log('🚀 Redirecting directly to TwentyCRM...')
    window.location.href = crmUrl
  }, [])

  // Show a minimal loading state while redirecting
  return (
    <div className="min-h-screen bg-lawfirm-secondaryBackground flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lawfirm-accent mx-auto mb-4"></div>
        <h1 className="text-2xl font-serif text-lawfirm-text mb-2">Redirecting to Staff Portal...</h1>
        <p className="text-lawfirm-subtext">Taking you to the TwentyCRM system</p>
      </div>
    </div>
  )
}
