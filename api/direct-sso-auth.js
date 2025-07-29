// Direct Google OAuth Authentication Handler (No Clerk)
// This handles Google OAuth user creation/authentication with simple user storage

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { googleUser } = req.body;

    if (!googleUser || !googleUser.email) {
      return res.status(400).json({ 
        error: 'Missing Google user data' 
      });
    }

    console.log('🔄 Processing direct Google OAuth for:', googleUser.email);

    const {
      email,
      firstName,
      lastName,
      profileImage,
      googleId
    } = googleUser;

    // Create user object (in a real app, you'd store this in a database)
    const user = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      firstName,
      lastName,
      profileImage,
      googleId,
      authProvider: 'google',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    console.log('✅ User created:', user.id);

    // Try to create Snug client (non-blocking)
    try {
      console.log('🔄 Creating Snug client for user...');
      const snugResponse = await fetch('http://localhost:3002/api/snug-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email
        })
      });
      
      if (snugResponse.ok) {
        console.log('✅ Snug client created successfully');
        user.snugClientCreated = true;
      } else {
        console.log('⚠️ Snug client creation failed (non-blocking)');
        user.snugClientCreated = false;
      }
    } catch (error) {
      console.log('⚠️ Snug client creation error (non-blocking):', error.message);
      user.snugClientCreated = false;
    }

    // Return success with user data
    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        authProvider: user.authProvider,
        createdAt: user.createdAt,
        snugClientCreated: user.snugClientCreated
      }
    });

  } catch (error) {
    console.error('❌ Direct SSO authentication error:', error);
    return res.status(500).json({
      error: 'Authentication failed',
      details: error.message
    });
  }
}
