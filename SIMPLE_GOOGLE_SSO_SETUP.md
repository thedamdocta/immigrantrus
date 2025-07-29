# Simple Google SSO Setup Guide

## Quick Setup Steps

### 1. Create Google OAuth Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google Identity Services API"
4. Create OAuth 2.0 credentials:
   - Type: Web application
   - Name: "Immigrants R Us"
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://localhost:3001`
     - `http://localhost:3002`
     - `http://localhost:3003`
     - `http://localhost:3004`
     - `http://localhost:3005`
     - `http://localhost:3006`
     - `http://localhost:3007`
     - `http://localhost:3008`
     - `http://localhost:3009`
     - Add your production domain when ready

### 2. Update Environment Variables

Copy the Client ID from Google Cloud Console and update `.env.local`:

```bash
VITE_GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
```

### 3. How It Works

1. **User clicks "Continue with Google"**
2. **Google authentication popup appears**
3. **User signs in with Google**
4. **App receives user information**:
   - First name
   - Last name
   - Email
   - Profile picture
   - Google ID
5. **App creates Snug client** with this information
6. **User is redirected to success page**

### 4. Test the Implementation

1. Restart your development server
2. Navigate to the signup page
3. Click "Continue with Google"
4. Sign in with your Google account
5. Verify Snug client is created
6. Check success page shows correct information

## Current Implementation Details

- **Component**: `src/components/ui/simple-google-sso.tsx`
- **Native Google Sign-In SDK** (no third-party libraries)
- **Direct Snug API integration**
- **Simple JWT decoding** for user info
- **Session storage** for user data

## Troubleshooting

- **"Google OAuth Not Configured"**: Add your Client ID to `.env.local`
- **"The given client ID is not found"**: Check authorized origins in Google Cloud Console
- **Popup blocked**: Allow popups for localhost
- **Failed to create Snug client**: Check server logs and API endpoint

## Production Deployment

1. Add production domain to authorized origins
2. Update environment variables in production
3. Ensure HTTPS is enabled (required by Google)
4. Test thoroughly before launch
