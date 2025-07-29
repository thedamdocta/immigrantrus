// MCP Wrapper for Creating Clerk Users
// This endpoint uses the Clerk MCP server to create users programmatically

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, externalId, publicMetadata } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, firstName, lastName' 
      });
    }

    console.log('🔄 Creating Clerk user via MCP for:', email);

    // Since this is running in a Vercel/Node environment, we can't directly call MCP tools
    // Instead, we'll use a direct approach with Clerk's API
    const clerkClient = await import('@clerk/clerk-sdk-node').then(m => m.clerkClient);
    
    // Create user without password (OAuth user)
    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      firstName,
      lastName,
      externalId: externalId || undefined,
      publicMetadata: publicMetadata || {},
      skipPasswordChecks: true,
      skipPasswordRequirement: true
    });

    console.log('✅ Clerk user created via direct API:', clerkUser.id);

    return res.status(200).json({
      success: true,
      user: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        externalId: clerkUser.externalId,
        publicMetadata: clerkUser.publicMetadata
      }
    });

  } catch (error) {
    console.error('❌ MCP user creation error:', error);
    
    // Handle specific Clerk errors
    if (error.errors && error.errors[0]) {
      return res.status(400).json({
        error: 'Clerk user creation failed',
        details: error.errors[0].message,
        code: error.errors[0].code
      });
    }

    return res.status(500).json({
      error: 'Failed to create user',
      details: error.message
    });
  }
}
