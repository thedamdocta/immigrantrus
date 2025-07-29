# Production Deployment Guide for immigrantrus.org

## 🚀 DEPLOY SECURE AUTHENTICATION SYSTEM

### Step 1: Environment Variables Setup

#### ✅ ADD THESE NEW SECURE VARIABLES
Add these to your Vercel project environment variables:

```bash
# 🔐 NEW SECURE AUTHENTICATION SYSTEM
ENCRYPTION_KEY=5e3e62d03d86f9089a4d068e077c07541afe0aa760d07020715524d7943e009e
JWT_SECRET=da34a2647e0a5fe0ef1618a051629cba8326cc93e41039aa5139e3f250832f02ef024b395cd590b4b421a7692a7e2ef19954887be93b8992e1570e29cf5fdfac
SNUG_EMAIL_ENCRYPTED=ODAxOWQzNTM4MjY5MTM2ZDc2MWFmYzUxOGE3MTg4MzY6ZDM5MjRkY2RhNjAyNTY3NzkxNDJkYWJjOGE5ODdjOWU1NmZiNzcyMGJjNDQ2YTFjODM0MmYzZmFjZjk2ZGZlNg==
SNUG_PASSWORD_ENCRYPTED=NGM0NTIxMDFhOTI3Y2ZiN2YzN2U4YTJkNzlmZTE0OWI6NWNjZTU4N2MzNTQzOTdiMDk4NGNmMDYxZDU4NGUzNWY=
```

#### ❌ REMOVE THESE OLD INSECURE VARIABLES
**DELETE these from your Vercel environment variables:**

```bash
# 🗑️ DELETE - INSECURE (credentials exposed to browser)
VITE_SNUG_EMAIL=marlene@fordelaw.org
VITE_SNUG_PASSWORD=Godfrey2025$
```

#### ✅ KEEP THESE EXISTING VARIABLES
**KEEP these Google OAuth variables:**

```bash
# ✅ KEEP - Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=282354422668-f84k3q9hkspihdvqg22blvjh3p958pko.apps.googleusercontent.com
GOOGLE_CLIENT_ID=282354422668-f84k3q9hkspihdvqg22blvjh3p958pko.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=TEMP_SECRET_FOR_TESTING
```

## 🔧 Vercel Environment Variable Setup

### How to Add Environment Variables in Vercel:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your `immigrantrus` project

2. **Navigate to Settings**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the sidebar

3. **Add New Variables**
   - Click "Add New"
   - For each variable above:
     - **Name**: Enter the variable name (e.g., `ENCRYPTION_KEY`)
     - **Value**: Enter the variable value
     - **Environment**: Select "Production", "Preview", and "Development"
     - Click "Save"

4. **Delete Old Variables**
   - Find `VITE_SNUG_EMAIL` and `VITE_SNUG_PASSWORD`
   - Click the "..." menu next to each
   - Click "Delete"

## 📦 Deploy the Code

### Method 1: Git Push (Recommended)
```bash
# Commit the new secure code
git add .
git commit -m "feat: implement secure JWT authentication system

- Add encrypted credential management
- Implement JWT authentication for API security  
- Replace insecure VITE_SNUG_* variables with encrypted system
- Add comprehensive error handling
- Fix 'Failed to fetch' errors in Google SSO flow"

# Push to trigger automatic deployment
git push origin main
```

### Method 2: Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel --prod
```

## 🧪 Test the Deployment

### 1. After Deployment Completes:
Visit: https://immigrantrus.org

### 2. Test User Registration:
1. Click "Get Started"
2. Try manual registration with test data
3. Verify the success page shows without "Failed to fetch" errors

### 3. Test Google SSO:
1. Click "Continue with Google" 
2. Complete Google authentication
3. Verify GetSnug client creation works

### 4. Check Console Logs:
- Open browser dev tools
- Look for security logs showing JWT authentication working
- Verify no "Failed to fetch" errors

## 🔍 Verify Security

### Check Environment Variables Work:
After deployment, the logs should show:
```
✅ Credentials decrypted successfully
✅ Authentication successful  
✅ Client created successfully
```

### Security Indicators:
- ✅ No credentials visible in browser network tab
- ✅ JWT tokens being generated
- ✅ API calls authenticated with Bearer tokens
- ✅ Error handling working properly

## 🚨 Troubleshooting

### If Environment Variables Don't Work:
1. **Redeploy after adding variables**:
   ```bash
   git commit --allow-empty -m "trigger redeploy"
   git push origin main
   ```

2. **Check Vercel Deployment Logs**:
   - Go to Vercel Dashboard > Deployments
   - Click on latest deployment
   - Check "Function Logs" for any errors

3. **Verify Variable Names**:
   - Ensure no typos in environment variable names
   - Case-sensitive: `ENCRYPTION_KEY` not `encryption_key`

### If Still Getting "Failed to fetch":
1. **Check API Routes**:
   - Verify `api/auth.js` and `api/snug-client.js` deployed
   - Check Vercel Functions section

2. **Browser Console**:
   - Look for specific error messages
   - Check if JWT authentication is working

## 📊 Expected Results

### ✅ Working Flow:
1. **User Registration** → Success page shows
2. **JWT Authentication** → Token generated (visible in logs)
3. **GetSnug API Call** → Client created successfully  
4. **User Experience** → "Profile setup complete!" message
5. **No Errors** → No "Failed to fetch" in console

### 🔒 Security Verification:
- GetSnug credentials never visible in browser
- All API calls use JWT authentication
- Encrypted data only decrypted server-side
- Comprehensive error handling

## 🎯 SUCCESS CRITERIA

After deployment, you should see:
- ✅ User registration works without errors
- ✅ Google SSO integration functional  
- ✅ GetSnug client creation successful
- ✅ No "Failed to fetch" errors
- ✅ Professional success messages
- ✅ Enhanced security with encrypted credentials

The secure authentication system will be fully operational on immigrantrus.org with enterprise-grade security protecting your GetSnug credentials.
