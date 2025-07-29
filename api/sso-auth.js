// SSO Authentication Handler using Direct Clerk API
// This handles Google OAuth user creation/authentication

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

    console.log('🔄 Processing SSO authentication for:', googleUser.email);

    const {
      email,
      firstName,
      lastName,
      profileImage,
      googleId
    } = googleUser;

    // Import Clerk SDK directly
    const { clerkClient } = await import('@clerk/clerk-sdk-node');
    
    let clerkUser;

    try {
      // First, try to find existing user by email
      const existingUsers = await clerkClient.users.getUserList({
        emailAddress: [email]
      });

      if (existingUsers.data && existingUsers.data.length > 0) {
        clerkUser = existingUsers.data[0];
        console.log('✅ Existing user found:', clerkUser.id);
      } else {
        // Create new user without password (OAuth user)
        console.log('🆕 Creating new Clerk user for:', email);
        
        clerkUser = await clerkClient.users.createUser({
          emailAddress: [email],
          firstName,
          lastName,
          externalId: googleId,
          publicMetadata: {
            profileImage,
            authProvider: 'google',
            createdVia: 'sso-direct'
          },
          skipPasswordChecks: true,
          skipPasswordRequirement: true
        });
        
        console.log('✅ New Clerk user created:', clerkUser.id);
      }
    } catch (clerkError) {
      console.error('❌ Clerk operation failed:', clerkError);
      
      // Handle specific Clerk errors
      if (clerkError.errors && clerkError.errors[0]) {
        return res.status(400).json({
          error: 'User authentication failed',
          details: clerkError.errors[0].message,
          code: clerkError.errors[0].code
        });
      }
      
      return res.status(500).json({
        error: 'Failed to authenticate user',
        details: clerkError.message
      });
    }

    // Try to create Snug client (non-blocking)
    try {
      console.log('🔄 Creating Snug client for SSO user...');
      const snugResponse = await fetch('http://localhost:3002/api/snug-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email
        }),
        timeout: 5000 // 5 second timeout
      });
      
      if (snugResponse.ok) {
        console.log('✅ Snug client created successfully');
      } else {
        console.log('⚠️ Snug client creation failed (non-blocking)');
      }
    } catch (error) {
      console.log('⚠️ Snug client creation error (non-blocking):', error.message);
      // Continue without failing the SSO process
    }

    // Return success with user data for frontend
    return res.status(200).json({
      success: true,
      user: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses?.[0]?.emailAddress || email,
        firstName: clerkUser.firstName || firstName,
        lastName: clerkUser.lastName || lastName,
        profileImage: profileImage,
        authProvider: 'google',
        createdAt: clerkUser.createdAt
      }
    });

  } catch (error) {
    console.error('❌ SSO authentication handler error:', error);
    return res.status(500).json({
      error: 'SSO authentication failed',
      details: error.message
    });
  }
}
