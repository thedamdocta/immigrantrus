#!/usr/bin/env node
// Test script to verify SSO fix

import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

console.log('🔄 Testing SSO Fix...');
console.log('📋 Environment Check:');
console.log('   - VITE_GOOGLE_CLIENT_ID:', process.env.VITE_GOOGLE_CLIENT_ID || 'Not set');
console.log('   - CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? 'SET' : 'MISSING');

// Simple test server to verify API endpoints work
const app = express();
app.use(cors());
app.use(express.json());

// Test SSO endpoint
app.post('/api/test-sso', async (req, res) => {
  try {
    console.log('🧪 Testing SSO endpoint...');
    
    // Test data
    const testGoogleUser = {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      profileImage: 'https://example.com/image.jpg',
      googleId: 'test-google-id-12345'
    };

    // Try to import the SSO handler
    const { default: ssoHandler } = await import('./api/sso-auth.js');
    
    // Mock request/response
    const mockReq = {
      method: 'POST',
      body: { googleUser: testGoogleUser }
    };
    
    const mockRes = {
      status: (code) => ({
        json: (data) => {
          console.log(`✅ SSO Handler Response (${code}):`, data);
          return res.status(code).json(data);
        }
      })
    };
    
    await ssoHandler(mockReq, mockRes);
    
  } catch (error) {
    console.error('❌ SSO Test Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('🧪 SSO Test Server running on http://localhost:3001');
  console.log('\n📝 To test SSO fix:');
  console.log('1. Run: npm run dev (in another terminal)');
  console.log('2. Run: node server.js (in another terminal)');
  console.log('3. Open: http://localhost:5173');
  console.log('4. Try the Google SSO button');
  console.log('\n🔍 Check browser console for detailed logs');
});

// Test the SSO endpoint
setTimeout(async () => {
  try {
    const testResponse = await fetch('http://localhost:3001/api/test-sso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    
    if (testResponse.ok) {
      console.log('✅ SSO endpoint test passed');
    } else {
      console.log('⚠️ SSO endpoint test needs attention');
    }
  } catch (error) {
    console.log('🔍 SSO endpoint test requires live environment');
  }
}, 2000);
