// Test script to verify the correct 3-step GetSnug API approach
const fetch = require('node-fetch');

// Correct configuration based on documentation
const AUTH_BASE_URL = 'https://auth.getsnug.com';
const API_BASE_URL = 'https://api.getsnug.com';

// Configuration from environment
const SNUG_EMAIL = 'marlene@fordelaw.org';
const SNUG_PASSWORD = 'Godfrey2025$';
const PRO_GROUP_ID = process.env.SNUG_PRO_GROUP_ID || 'your-pro-group-id';
const UD_ID = process.env.SNUG_UD_ID || 'your-ud-id';

async function testCorrectAPI() {
  console.log('🔍 Testing Correct GetSnug API 3-Step Approach...\n');

  try {
    // Step 1: Authenticate
    console.log('🔄 Step 1: Authenticating...');
    const authResponse = await fetch(`${AUTH_BASE_URL}/auth/login`, {
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
      const errorText = await authResponse.text();
      console.log(`❌ Auth failed: ${errorText.substring(0, 200)}...`);
      return false;
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;
    console.log('✅ Authentication successful');
    console.log(`🔑 Token: ${accessToken ? 'Received' : 'Missing'}`);

    // Step 2: Create client role using correct endpoint
    console.log('\n🔄 Step 2: Creating client role...');
    
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

    const clientUrl = `${API_BASE_URL}/${UD_ID}/pro-group/${PRO_GROUP_ID}/pro-people-roles/`;
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
  console.log('🧪 Starting GetSnug API Test with Correct Structure...\n');
  
  const success = await testCorrectAPI();
  
  if (success) {
    console.log('\n✅ API test completed successfully');
  } else {
    console.log('\n❌ API test failed - check configuration');
    console.log('💡 Make sure to set:');
    console.log('   - SNUG_PRO_GROUP_ID');
    console.log('   - SNUG_UD_ID');
    console.log('   - VITE_SNUG_EMAIL');
    console.log('   - VITE_SNUG_PASSWORD');
  }
}

// Run the test
runTest().catch(console.error);
