// Secure JWT Authentication API
const JWTAuth = require('./security/jwt-middleware');

// Initialize JWT authentication
let jwtAuth;

try {
  jwtAuth = new JWTAuth();
} catch (error) {
  console.error('❌ JWT Auth initialization failed:', error.message);
}

module.exports = async function handler(req, res) {
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
    if (!jwtAuth) {
      return res.status(500).json({ 
        error: 'Authentication service not configured',
        code: 'JWT_NOT_CONFIGURED'
      });
    }

    const { user, authMethod } = req.body;

    // Validate required fields
    if (!user || !user.email) {
      return res.status(400).json({ 
        error: 'Missing required user data',
        details: 'user.email is required'
      });
    }

    if (!authMethod) {
      return res.status(400).json({ 
        error: 'Missing authentication method',
        details: 'authMethod is required (e.g., "google", "manual")'
      });
    }

    console.log(`🔐 Generating JWT token for: ${user.email} (${authMethod})`);

    // Create user object for JWT
    const userData = {
      id: user.googleId || user.id || `${authMethod}-${Date.now()}`,
      email: user.email,
      authMethod: authMethod
    };

    // Generate JWT token
    const accessToken = jwtAuth.generateToken(userData);
    const refreshToken = jwtAuth.generateRefreshToken(userData);

    console.log(`✅ JWT tokens generated for: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: userData.id,
          email: userData.email,
          authMethod: userData.authMethod,
          firstName: user.firstName || user.given_name,
          lastName: user.lastName || user.family_name,
          name: user.name,
          picture: user.picture
        },
        expiresIn: '24h'
      }
    });

  } catch (error) {
    console.error('❌ Authentication error:', error.message);
    
    res.status(500).json({
      error: 'Authentication failed',
      details: error.message
    });
  }
};
