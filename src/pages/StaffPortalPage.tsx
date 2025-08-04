import { useEffect } from 'react'

export default function StaffPortalPage() {
  useEffect(() => {
    // Load the TwentyCRM iframe instead of redirecting
    console.log('🚀 Loading Staff Portal with TwentyCRM')
  }, [])

  // Embed the TwentyCRM directly in an iframe to avoid redirect issues
  return (
    <div className="min-h-screen w-full">
      <iframe 
        src="/staff-portal/"
        className="w-full h-screen border-0"
        title="Staff Portal - TwentyCRM"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  )
}
