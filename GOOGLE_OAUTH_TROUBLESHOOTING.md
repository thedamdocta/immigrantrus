# Google OAuth Troubleshooting

## Still seeing "The given origin is not allowed" error?

### 1. Verify Authorized Origins (Most Common Issue)

Make sure you added the EXACT URL with correct port:
- ✅ Correct: `http://localhost:3009`
- ❌ Wrong: `http://localhost:3009/` (no trailing slash)
- ❌ Wrong: `https://localhost:3009` (https instead of http)
- ❌ Wrong: `localhost:3009` (missing http://)

### 2. Wait for Propagation

Google OAuth changes can take 5-15 minutes to propagate. Try:
1. Wait 5 minutes
2. Clear browser cache and cookies
3. Open in incognito/private browsing mode
4. Try again

### 3. Double-Check Client ID

Verify in Google Cloud Console:
1. Go to APIs & Services → Credentials
2. Find your OAuth 2.0 Client ID
3. Verify it matches: `282354422668-f84k3q9hkspihdvqg22blvjh3p958pko.apps.googleusercontent.com`

### 4. Check All Authorized Origins

Your OAuth client should have these origins:
```
http://localhost:3000
http://localhost:3001
http://localhost:3002
http://localhost:3003
http://localhost:3004
http://localhost:3005
http://localhost:3006
http://localhost:3007
http://localhost:3008
http://localhost:3009
```

### 5. Quick Fix: Use a Different Port

If still having issues, try:

1. Stop the current server
2. Update package.json:
```json
"scripts": {
  "dev": "vite --port 3000"
}
```
3. Run `npm run dev`
4. Access at `http://localhost:3000`

### 6. Alternative: Create New OAuth Client

If nothing works, create a fresh OAuth client:
1. Create new OAuth 2.0 Client ID
2. Add all localhost ports (3000-3009)
3. Update `.env.local` with new client ID
4. Restart server

### 7. Browser Console Check

Open browser console and check for:
- Any blocked requests
- CORS errors
- Mixed content warnings

### Common Solutions:
- Clear browser cache
- Try incognito mode
- Disable browser extensions
- Use Chrome (most compatible)
- Check firewall/antivirus settings

Once the authorized origin is properly configured and propagated, the Google SSO will work perfectly!
