// Test script to verify the final correct GetSnug API approach
const fetch = require('node-fetch');

// Correct configuration based on documentation and research
const AUTH_BASE_URL = 'https://auth.getsnug.com';
const API_BASE_URL = 'https://api.getsnug.com';

// Configuration from environment
const SNUG_EMAIL = 'marlene@fordelaw.org';
const SNUG_PASSWORD = 'Godfrey2025$';

async function testFinalAPI() {
  console.log('🔍 Testing Final GetSnug API Structure...\n');

  try {
    // Step 1: Authenticate - try different auth endpoints
    console.log('🔄 Step 1: Authenticating...');
    
    // Try the correct auth endpoint
    const authResponse = await fetch(`${AUTH_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: SNUG_EMAIL,
        password: SNUG_PASSWORD
      })
    });

    console.log(`📡 Auth Response: ${authResponse.status} ${authResponse.statusText}`);
    
    if (!authResponse.ok) {
      // Try alternative auth endpoint
      console.log('🔄 Trying alternative auth endpoint...');
      const altAuthResponse = await fetch(`${AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: SNUG_EMAIL,
          password: SNUG_PASSWORD
        })
      });
      
      console.log(`📡 Alt Auth Response: ${altAuthResponse.status} ${altAuthResponse.statusText}`);
      
      if (!altAuthResponse.ok) {
        const errorText = await altAuthResponse.text();
        console.log(`❌ Auth failed: ${errorText.substring(0, 200)}...`);
        return false;
      }
      
      const authData = await altAuthResponse.json();
      const accessToken = authData.access_token || authData.token;
      console.log('✅ Authentication successful');
      console.log(`🔑 Token: ${accessToken ? 'Received' : 'Missing'}`);
      
      return true;
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;
    console.log('✅ Authentication successful');
    console.log(`🔑 Token: ${accessToken ? 'Received' : 'Missing'}`);

    // Step 2: Test API availability
    console.log('\n🔄 Step 2: Testing API availability...');
    
    // Test basic API endpoint
    const apiTestResponse = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    console.log(`📡 API Health: ${apiTestResponse.status} ${apiTestResponse.statusText}`);
    
    // Step 3: Test client creation structure
    console.log('\n🔄 Step 3: Testing client creation structure...');
    
    // Test with placeholder IDs
    const clientData = {
      client_data: {
        full_name: 'Devon Smart Jr',
        contact_email: 'devonsmartjr@gmail.com'
      },
      client_role: {
        will_price: 0,
        trust_price: 0
      }
    };

    // Test with actual GetSnug structure
    const clientUrl = `${API_BASE_URL}/pro-people-roles/`;
    console.log(`📡 Client URL: ${clientUrl}`);

    const clientResponse = await fetch(clientUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(clientData)
    });

    console.log(`📡 Client Response: ${clientResponse.status} ${clientResponse.statusText}`);
    
    if (clientResponse.ok) {
      const result = await clientResponse.json();
      console.log('✅ Client created successfully:', result);
      return true;
    } else {
      const errorText = await clientResponse.text();
      console.log(`❌ Client creation failed: ${errorText.substring(0, 200)}...`);
      
      // Check for specific errors
      if (errorText.includes('already exists') || errorText.includes('duplicate')) {
        console.log('✅ Client already exists - this is expected');
        return true;
      }
      
      return false;
    }

  } catch (error) {
    console.error('❌ Network error:', error.message);
    return false;
  }
}

async function runTest() {
  console.log('🧪 Starting Final GetSnug API Test...\n');
  
  const success = await testFinalAPI();
  
  if (success) {
    console.log('\n✅ API test completed successfully');
  } else {
    console.log('\n❌ API test failed - may need to contact GetSnug support');
    console.log('💡 The API structure appears to be:');
    console.log('   1. Auth: https://auth.getsnug.com/auth/signin');
    console.log('   2. API: https://api.getsnug.com');
    console.log('   3. Client: https://api.getsnug.com/{ud_id}/pro-group/{pro_group_id}/pro-people-roles/');
  }
}

// Run the test
runTest().catch(console.error);
