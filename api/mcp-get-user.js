// MCP Wrapper for Getting Clerk Users
// This endpoint retrieves user data by email

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, userId } = req.body;

    if (!email && !userId) {
      return res.status(400).json({ 
        error: 'Missing required field: email or userId' 
      });
    }

    console.log('🔄 Getting Clerk user via MCP for:', email || userId);

    // Use direct Clerk API approach
    const clerkClient = await import('@clerk/clerk-sdk-node').then(m => m.clerkClient);
    
    let clerkUser;
    
    if (userId) {
      // Get user by ID
      clerkUser = await clerkClient.users.getUser(userId);
    } else {
      // Get user by email
      const users = await clerkClient.users.getUserList({
        emailAddress: [email]
      });
      
      if (users.length > 0) {
        clerkUser = users[0];
      } else {
        return res.status(404).json({
          error: 'User not found',
          details: `No user found with email: ${email}`
        });
      }
    }

    console.log('✅ Clerk user found via direct API:', clerkUser.id);

    return res.status(200).json({
      success: true,
      user: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        externalId: clerkUser.externalId,
        publicMetadata: clerkUser.publicMetadata,
        createdAt: clerkUser.createdAt
      }
    });

  } catch (error) {
    console.error('❌ MCP get user error:', error);
    
    // Handle specific Clerk errors
    if (error.errors && error.errors[0]) {
      return res.status(400).json({
        error: 'Clerk user retrieval failed',
        details: error.errors[0].message,
        code: error.errors[0].code
      });
    }

    // Handle 404 errors
    if (error.status === 404) {
      return res.status(404).json({
        error: 'User not found',
        details: error.message
      });
    }

    return res.status(500).json({
      error: 'Failed to retrieve user',
      details: error.message
    });
  }
}
