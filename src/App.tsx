import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Check if we have a valid Clerk key (not placeholder)
const hasValidClerkKey = clerkPubKey && clerkPubKey !== 'pk_test_your_key_here' && clerkPubKey.startsWith('pk_test_') || clerkPubKey.startsWith('pk_live_')

function App() {
  // If no valid Clerk key, run without Clerk (demo mode)
  if (!hasValidClerkKey) {
    console.warn('No valid Clerk key found. Running in demo mode. Set VITE_CLERK_PUBLISHABLE_KEY in .env.local for full functionality.')
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    )
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </ClerkProvider>
  )
}

export default App
