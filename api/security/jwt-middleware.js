const jwt = require('jsonwebtoken');

/**
 * JWT Authentication Middleware
 * Provides secure authentication for API endpoints
 */
class JWTAuth {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    if (!this.secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    
    this.defaultOptions = {
      expiresIn: '24h',
      issuer: 'immigrantrus-api',
      audience: 'immigrantrus-client'
    };
  }

  /**
   * Generate a JWT token for a user
   * @param {Object} user - User data
   * @param {string} user.id - User ID
   * @param {string} user.email - User email
   * @param {string} user.authMethod - Authentication method (google, manual)
   * @returns {string} - JWT token
   */
  generateToken(user) {
    const payload = {
      sub: user.id,
      email: user.email,
      authMethod: user.authMethod,
      iat: Math.floor(Date.now() / 1000)
    };

    return jwt.sign(payload, this.secret, this.defaultOptions);
  }

  /**
   * Verify a JWT token
   * @param {string} token - JWT token to verify
   * @returns {Object} - Decoded token payload
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret, {
        issuer: this.defaultOptions.issuer,
        audience: this.defaultOptions.audience
      });
    } catch (error) {
      throw new Error(`Invalid token: ${error.message}`);
    }
  }

  /**
   * Express middleware to verify JWT tokens
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next function
   */
  verifyMiddleware(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({ 
          error: 'Authorization header missing',
          code: 'NO_AUTH_HEADER'
        });
      }

      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
          error: 'Invalid authorization format. Use: Bearer <token>',
          code: 'INVALID_AUTH_FORMAT'
        });
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix
      
      if (!token) {
        return res.status(401).json({ 
          error: 'Token missing from authorization header',
          code: 'NO_TOKEN'
        });
      }

      // Verify the token
      const decoded = this.verifyToken(token);
      
      // Add user info to request object
      req.user = {
        id: decoded.sub,
        email: decoded.email,
        authMethod: decoded.authMethod
      };

      next();
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      
      return res.status(401).json({ 
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN',
        details: error.message
      });
    }
  }

  /**
   * Create bound middleware function for use in Express routes
   * @returns {Function} - Express middleware function
   */
  middleware() {
    return this.verifyMiddleware.bind(this);
  }

  /**
   * Generate a refresh token (longer-lived)
   * @param {Object} user - User data
   * @returns {string} - Refresh token
   */
  generateRefreshToken(user) {
    const payload = {
      sub: user.id,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000)
    };

    return jwt.sign(payload, this.secret, {
      ...this.defaultOptions,
      expiresIn: '7d' // Refresh tokens last 7 days
    });
  }

  /**
   * Verify and refresh an access token using a refresh token
   * @param {string} refreshToken - Refresh token
   * @param {Object} userData - Fresh user data for new token
   * @returns {string} - New access token
   */
  refreshAccessToken(refreshToken, userData) {
    try {
      const decoded = this.verifyToken(refreshToken);
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid refresh token type');
      }

      // Generate new access token
      return this.generateToken(userData);
    } catch (error) {
      throw new Error(`Refresh token invalid: ${error.message}`);
    }
  }
}

module.exports = JWTAuth;
