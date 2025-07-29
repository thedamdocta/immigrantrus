# Google OAuth Setup Guide

## Critical Issue: Client ID Not Found

The error "The given client ID is not found" means your Google OAuth credentials are not properly configured. Here's how to fix it:

## Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or Select Project**: Choose your project or create a new one
3. **Enable Google Identity Services**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Identity Services"
   - Click "Enable"

## Step 2: Create OAuth 2.0 Credentials

1. **Go to Credentials**:
   - Navigate to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"

2. **Configure OAuth Consent Screen** (if not done):
   - Click "OAuth consent screen"
   - Choose "External" for testing
   - Fill required fields:
     - App name: "Immigrants R Us"
     - User support email: your email
     - Developer contact information: your email
   - Save and continue through all steps

3. **Create Web Application Credentials**:
   - Application type: "Web application"
   - Name: "Immigrants R Us - Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3008` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs (optional for this setup):
     - `http://localhost:3008/oauth-callback`
     - `https://yourdomain.com/oauth-callback`

## Step 3: Copy Credentials

After creating the credentials, you'll see:
- **Client ID**: Something like `123456789-abcdef.apps.googleusercontent.com`
- **Client Secret**: Something like `GOCSPX-xxxxxxxx`

## Step 4: Update Environment Variables

Update your `.env.local` file with the REAL credentials from Google Cloud Console:

```
VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE
GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_ACTUAL_CLIENT_SECRET_HERE
```

## Current Problem

The current client ID `507536406851-bvnr7qvl7j0b9jh2khr3oqjlhcotj3cs.apps.googleusercontent.com` appears to be either:
- Invalid/fake
- Not configured for localhost:3008
- Not properly set up in Google Cloud Console

## Testing

After proper setup, the Google OAuth button should work without the "client ID not found" error.

## Production Notes

For production deployment:
- Use HTTPS domain
- Update authorized origins to your production domain
- Keep client secret secure (server-side only)
