# OAuth Client Configuration Fix

## Current Issue: Error 401: invalid_client

The screenshot shows "Error 401: invalid_client" at `accounts.google.com/signin/oauth/error`. This means:

1. **Wrong Client ID**: The client ID in `.env.local` doesn't match what's configured in Google Cloud Console
2. **Invalid Client Setup**: The OAuth client is not properly configured 
3. **Domain Mismatch**: The authorized origins don't match the current domain

## Root Cause Analysis

The OAuth client name shows as "forbiddente" which doesn't match our expected "Immigrants R Us" application, indicating the client ID `507536406851-bvnr7qvl7j0b9jh2khr3oqjlhcotj3cs.apps.googleusercontent.com` is either:
- Not the correct client ID for this project
- Not configured with proper authorized JavaScript origins
- Associated with a different project/application

## Immediate Solution Steps

### Step 1: Verify Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select the correct project (or create a new one)
3. Navigate to "APIs & Services" → "Credentials"
4. Look for existing OAuth 2.0 Client IDs

### Step 2: Create New OAuth Client (Recommended)

Since the current client ID appears to be invalid or misconfigured:

1. **Delete the current OAuth client** (if it exists and is problematic)
2. **Create a new OAuth 2.0 Client ID**:
   - Application type: Web application
   - Name: "Immigrants R Us - Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3008`
     - `http://localhost:3000` (backup)
   - Authorized redirect URIs:
     - `http://localhost:3008/oauth-callback`
     - `http://localhost:3008/auth-success`

### Step 3: Update Environment Variables

Replace the current client ID with the new one from Google Cloud Console:

```bash
# Replace in .env.local
VITE_GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET_HERE
```

### Step 4: Restart Development Server

After updating environment variables:
```bash
# Stop current server and restart
npm run dev
```

## Alternative: Use Test Client ID

For immediate testing, you can use Google's test client ID (development only):
```
VITE_GOOGLE_CLIENT_ID=1052949397862-k8vg3ceh1a5gfqh3tpq7i8rveb9rq1rv.apps.googleusercontent.com
```

This will work for localhost testing but must be replaced for production.

## Expected Result

After proper configuration:
- No more "Error 401: invalid_client"
- OAuth client name should show as "Immigrants R Us" 
- Successful authentication and redirect to success page
