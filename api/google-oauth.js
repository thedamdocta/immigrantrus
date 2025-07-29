import fetch from 'node-fetch';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.vercel.app/oauth-success'
  : 'http://localhost:3006/oauth-success';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    console.log('🔄 Exchanging authorization code for tokens...');

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      return res.status(400).json({ error: 'Failed to exchange authorization code' });
    }

    const tokenData = await tokenResponse.json();
    console.log('✅ Tokens received');

    // Get user profile information
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!profileResponse.ok) {
      console.error('Profile fetch failed');
      return res.status(400).json({ error: 'Failed to fetch user profile' });
    }

    const profile = await profileResponse.json();
    console.log('✅ User profile received:', profile.email);

    // Extract user data
    const userData = {
      id: profile.id,
      email: profile.email,
      firstName: profile.given_name || '',
      lastName: profile.family_name || '',
      name: profile.name || '',
      picture: profile.picture || '',
      verified_email: profile.verified_email || false,
    };

    console.log('🚀 Creating GetSnug client for OAuth user...');

    // Create GetSnug client
    try {
      const snugApiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.vercel.app/api/snug-client'
        : 'http://localhost:3002/api/snug-client';

      const snugResponse = await fetch(snugApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email
        })
      });

      if (snugResponse.ok) {
        const snugResult = await snugResponse.json();
        console.log('✅ GetSnug client created for OAuth user');
        userData.snugClient = snugResult;
      } else {
        console.warn('⚠️ GetSnug client creation failed, but continuing');
        userData.snugError = 'Failed to create GetSnug client';
      }
    } catch (snugError) {
      console.warn('⚠️ GetSnug client creation error:', snugError.message);
      userData.snugError = snugError.message;
    }

    return res.status(200).json(userData);

  } catch (error) {
    console.error('OAuth handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
