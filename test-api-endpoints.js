// Test script to verify API endpoints are working correctly
const fetch = require('node-fetch');

// Test configuration - let's try different GetSnug endpoints
const SNUG_BASE_URLS = [
  'https://auth.getsnug.com',
  'https://app.getsnug.com',
  'https://api.getsnug.com',
  'https://getsnug.com'
];

const SNUG_EMAIL = process.env.VITE_SNUG_EMAIL || 'marlene@fordelaw.org';
const SNUG_PASSWORD = process.env.VITE_SNUG_PASSWORD || 'Godfrey2025$';

async function testAllEndpoints() {
  console.log('🔍 Testing all possible GetSnug API endpoints...\n');
  
  for (const baseUrl of SNUG_BASE_URLS) {
    console.log(`🧪 Testing: ${baseUrl}`);
    
    try {
      // Test authentication
      const authResponse = await fetch(`${baseUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: SNUG_EMAIL,
          password: SNUG_PASSWORD
        })
      });

      console.log(`   📡 Auth: ${authResponse.status} ${authResponse.statusText}`);
      
      if (authResponse.ok) {
        const authData = await authResponse.json();
        console.log(`   ✅ Auth successful at ${baseUrl}`);
        
        // Test client creation
        const clientResponse = await fetch(`${baseUrl}/clients`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.access_token}`
          },
          body: JSON.stringify({
            client_data: {
              full_name: 'Test User',
              contact_email: 'test@example.com'
            }
          })
        });
        
        console.log(`   📡 Client: ${clientResponse.status} ${clientResponse.statusText}`);
        
        if (clientResponse.ok) {
          console.log(`   ✅ Client creation successful at ${baseUrl}`);
          return baseUrl;
        }
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log('❌ No working endpoints found');
  return null;
}

async function testLocalAPI() {
  console.log('\n🧪 Testing Local API Endpoint...');
  
  try {
    const response = await fetch('http://localhost:3000/api/snug-client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      })
    });

    console.log(`📡 Local API Response: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Local API working:', data);
    } else {
      const errorText = await response.text();
      console.log('❌ Local API error:', errorText);
    }
  } catch (error) {
    console.log('❌ Local API not available:', error.message);
  }
}

async function testWithCorrectCredentials() {
  console.log('\n🔍 Testing with actual credentials...');
  
  // Try the most likely endpoints
  const endpoints = [
    'https://auth.getsnug.com',
    'https://app.getsnug.com'
  ];
  
  for (const baseUrl of endpoints) {
    console.log(`\n🧪 Testing ${baseUrl} with provided credentials...`);
    
    try {
      const response = await fetch(`${baseUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'marlene@fordelaw.org',
          password: 'Godfrey2025$'
        })
      });

      console.log(`   📡 Response: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`   ✅ Success! Token: ${data.access_token ? 'Received' : 'Missing'}`);
        return { baseUrl, token: data.access_token };
      } else {
        const errorText = await response.text();
        console.log(`   ❌ Error: ${errorText}`);
      }
    } catch (error) {
      console.log(`   ❌ Network error: ${error.message}`);
    }
  }
  
  return null;
}

async function runAllTests() {
  console.log('🔍 Starting Comprehensive API Tests...\n');
  
  const workingEndpoint = await testAllEndpoints();
  if (workingEndpoint) {
    console.log(`\n✅ Found working endpoint: ${workingEndpoint}`);
  }
  
  await testWithCorrectCredentials();
  await testLocalAPI();
  
  console.log('\n✅ Test suite completed');
}

// Run tests
runAllTests().catch(console.error);
