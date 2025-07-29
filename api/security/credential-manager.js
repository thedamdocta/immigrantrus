const crypto = require('crypto');

/**
 * Secure Credential Manager
 * Handles encryption/decryption of sensitive credentials
 * Credentials are encrypted at rest and only decrypted in memory when needed
 */
class CredentialManager {
  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.keyLength = 32; // 256 bits
    this.ivLength = 16;  // 128 bits
    
    // Get encryption key from environment (must be 64 hex characters = 32 bytes)
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey || encryptionKey.length !== 64) {
      throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
    }
    
    this.key = Buffer.from(encryptionKey, 'hex');
  }

  /**
   * Encrypt a plaintext string
   * @param {string} plaintext - The text to encrypt
   * @returns {string} - Base64 encoded encrypted data with IV
   */
  encrypt(plaintext) {
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Combine IV + encrypted data and encode as base64
    const combined = iv.toString('hex') + ':' + encrypted;
    return Buffer.from(combined).toString('base64');
  }

  /**
   * Decrypt an encrypted string
   * @param {string} encryptedData - Base64 encoded encrypted data
   * @returns {string} - Decrypted plaintext
   */
  decrypt(encryptedData) {
    try {
      const combined = Buffer.from(encryptedData, 'base64').toString();
      const parts = combined.split(':');
      
      if (parts.length !== 2) {
        throw new Error('Invalid encrypted data format');
      }
      
      const iv = Buffer.from(parts[0], 'hex');
      const encrypted = parts[1];
      
      const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  /**
   * Get GetSnug credentials (decrypted in memory only)
   * @returns {Object} - {email, password}
   */
  getSnugCredentials() {
    const encryptedEmail = process.env.SNUG_EMAIL_ENCRYPTED;
    const encryptedPassword = process.env.SNUG_PASSWORD_ENCRYPTED;

    if (!encryptedEmail || !encryptedPassword) {
      throw new Error('Encrypted GetSnug credentials not found in environment variables');
    }

    try {
      return {
        email: this.decrypt(encryptedEmail),
        password: this.decrypt(encryptedPassword)
      };
    } catch (error) {
      throw new Error(`Failed to decrypt GetSnug credentials: ${error.message}`);
    }
  }

  /**
   * Generate a new encryption key (for setup)
   * @returns {string} - 64 character hex string
   */
  static generateEncryptionKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Generate a new JWT secret (for setup)
   * @returns {string} - 128 character hex string
   */
  static generateJWTSecret() {
    return crypto.randomBytes(64).toString('hex');
  }
}

module.exports = CredentialManager;
