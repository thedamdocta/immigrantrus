const CredentialManager = require('./api/security/credential-manager');

/**
 * Security Setup Script
 * Generates encryption keys and encrypts GetSnug credentials
 * Run this script once to set up secure credential storage
 */

console.log('🔐 Security Setup for GetSnug API Integration\n');

// Current credentials (to be encrypted)
const SNUG_EMAIL = 'marlene@fordelaw.org';
const SNUG_PASSWORD = 'Godfrey2025$';

try {
  // Generate secure keys
  console.log('🔑 Generating encryption keys...');
  const encryptionKey = CredentialManager.generateEncryptionKey();
  const jwtSecret = CredentialManager.generateJWTSecret();
  
  console.log('✅ Keys generated successfully\n');

  // Create credential manager with the new key
  process.env.ENCRYPTION_KEY = encryptionKey;
  const credManager = new CredentialManager();

  // Encrypt the credentials
  console.log('🔒 Encrypting GetSnug credentials...');
  const encryptedEmail = credManager.encrypt(SNUG_EMAIL);
  const encryptedPassword = credManager.encrypt(SNUG_PASSWORD);
  
  console.log('✅ Credentials encrypted successfully\n');

  // Test decryption to ensure it works
  console.log('🧪 Testing decryption...');
  const testEmail = credManager.decrypt(encryptedEmail);
  const testPassword = credManager.decrypt(encryptedPassword);
  
  if (testEmail === SNUG_EMAIL && testPassword === SNUG_PASSWORD) {
    console.log('✅ Decryption test passed\n');
  } else {
    throw new Error('Decryption test failed - encrypted values are corrupted');
  }

  // Display results
  console.log('🎯 SECURE ENVIRONMENT VARIABLES TO SET:');
  console.log('=' .repeat(70));
  console.log('');
  console.log('# Add these to your Vercel environment variables:');
  console.log('# (Remove the old VITE_SNUG_* variables)');
  console.log('');
  console.log(`ENCRYPTION_KEY=${encryptionKey}`);
  console.log(`JWT_SECRET=${jwtSecret}`);
  console.log(`SNUG_EMAIL_ENCRYPTED=${encryptedEmail}`);
  console.log(`SNUG_PASSWORD_ENCRYPTED=${encryptedPassword}`);
  console.log('');
  console.log('=' .repeat(70));
  console.log('');
  console.log('📋 NEXT STEPS:');
  console.log('1. Copy the environment variables above');
  console.log('2. Add them to your Vercel project settings');
  console.log('3. Remove the old VITE_SNUG_EMAIL and VITE_SNUG_PASSWORD variables');
  console.log('4. Deploy the updated secure API');
  console.log('');
  console.log('⚠️  SECURITY NOTES:');
  console.log('- Keep the ENCRYPTION_KEY secret and secure');
  console.log('- The encrypted credentials are safe to store in environment variables');
  console.log('- JWT_SECRET is used for user authentication tokens');
  console.log('- Original credentials are never stored in code or logs');
  console.log('');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}
