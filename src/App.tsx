import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'
import OAuthSuccessPage from './pages/OAuthSuccessPage'
import ProcessingPage from './pages/ProcessingPage'
import StaffPortalPage from './pages/StaffPortalPage'

function App() {
  console.log('🚀 App running with native Google Sign-In')
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/oauth-success" element={<OAuthSuccessPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/staff-portal" element={<StaffPortalPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
