// Direct test of GetSnug API without local server
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

// GetSnug API configuration
const AUTH_BASE_URL = 'https://auth.getsnug.com';
const API_BASE_URL = 'https://api.getsnug.com';

// GetSnug credentials from env
const SNUG_EMAIL = process.env.VITE_SNUG_EMAIL;
const SNUG_PASSWORD = process.env.VITE_SNUG_PASSWORD;

async function testDirectGetSnugAPI() {
  console.log('🧪 Testing Direct GetSnug API...\n');

  // Check credentials
  if (!SNUG_EMAIL || !SNUG_PASSWORD) {
    console.log('❌ Missing credentials in .env.local:');
    console.log(`   VITE_SNUG_EMAIL: ${SNUG_EMAIL ? 'SET' : 'MISSING'}`);
    console.log(`   VITE_SNUG_PASSWORD: ${SNUG_PASSWORD ? 'SET' : 'MISSING'}`);
    return;
  }

  console.log('✅ Credentials found');
  console.log(`   Email: ${SNUG_EMAIL}`);
  console.log(`   Password: ${'*'.repeat(SNUG_PASSWORD.length)}\n`);

  try {
    // Step 1: Authenticate
    console.log('🔄 Step 1: Authenticating with GetSnug...');
    console.log(`   URL: ${AUTH_BASE_URL}/api/token/`);
    
    const authResponse = await fetch(`${AUTH_BASE_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: SNUG_EMAIL,
        password: SNUG_PASSWORD
      })
    });

    console.log(`   Status: ${authResponse.status} ${authResponse.statusText}`);

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.log(`❌ Authentication failed:`);
      console.log(`   Response: ${errorText.substring(0, 300)}...`);
      return;
    }

    const authData = await authResponse.json();
    console.log('✅ Authentication successful');
    console.log(`   Access token: ${authData.access ? 'RECEIVED' : 'MISSING'}`);
    console.log(`   Token length: ${authData.access?.length || 0} chars\n`);

    // Step 2: Get user profile
    console.log('🔄 Step 2: Getting user profile...');
    console.log(`   URL: ${API_BASE_URL}/api/v3/user-data/?expand=professional_group_role`);
    
    const profileResponse = await fetch(`${API_BASE_URL}/api/v3/user-data/?expand=professional_group_role`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authData.access}`
      }
    });

    console.log(`   Status: ${profileResponse.status} ${profileResponse.statusText}`);

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.log(`❌ Profile retrieval failed:`);
      console.log(`   Response: ${errorText.substring(0, 300)}...`);
      return;
    }

    const profileData = await profileResponse.json();
    console.log('✅ Profile retrieved');
    console.log(`   Raw profile data: ${JSON.stringify(profileData, null, 2)}`);
    
    const userData = profileData.data;
    let proGroupId = null;
    let proGroupName = null;
    
    if (userData) {
      console.log(`   UD ID: ${userData.ud_id}`);
      console.log(`   Name: ${userData.first_name} ${userData.last_name}`);
      console.log(`   Email: ${userData.email}`);
      
      // Check different possible structures for professional group data
      console.log('   Checking professional group data structures...');
      console.log(`   - userData.professional_group_role_user_data: ${userData.professional_group_role_user_data ? 'EXISTS' : 'NULL'}`);
      console.log(`   - userData.professional_group: ${userData.professional_group ? 'EXISTS' : 'NULL'}`);
      console.log(`   - userData.professional_groups: ${userData.professional_groups ? 'EXISTS' : 'NULL'}`);
      
      if (userData.professional_group_role_user_data) {
        // The professional group ID is directly in the role data
        proGroupId = userData.professional_group_role_user_data.professional_group_id;
        proGroupName = 'Professional Group'; // We don't have the name in this response
      }
      
      console.log(`   Pro Group ID: ${proGroupId}`);
      console.log(`   Pro Group Name: ${proGroupName}`);
      console.log(`   Full Name: ${userData.full_name}`);
      console.log(`   Contact Email: ${userData.contact_email}`);
      
      if (!proGroupId) {
        console.log('   ❌ No professional group ID found');
        console.log('   professional_group_role_user_data:', userData.professional_group_role_user_data);
        return;
      }
    } else {
      console.log('   ❌ No user data found');
      return;
    }

    const udId = userData.ud_id;
    
    console.log('\n🔄 Step 3: Creating test client...');
    
    // Test client data
    const testClientData = {
      client_data: {
        full_name: 'Devon Smart Jr (Test)',
        contact_email: 'devonsmartjr+test@gmail.com'
      },
      client_role: {
        will_price: 29999,
        trust_price: 59999
      }
    };

    console.log(`   URL: ${API_BASE_URL}/api/v3/${udId}/pro-group/${proGroupId}/pro-people-roles/`);
    console.log(`   Client: ${testClientData.client_data.full_name}`);
    console.log(`   Email: ${testClientData.client_data.contact_email}`);

    const clientResponse = await fetch(`${API_BASE_URL}/api/v3/${udId}/pro-group/${proGroupId}/pro-people-roles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.access}`
      },
      body: JSON.stringify(testClientData)
    });

    console.log(`   Status: ${clientResponse.status} ${clientResponse.statusText}`);

    if (!clientResponse.ok) {
      const errorText = await clientResponse.text();
      console.log(`❌ Client creation failed:`);
      console.log(`   Response: ${errorText.substring(0, 500)}...`);
      
      // Check if it's a duplicate error
      if (errorText.includes('already exists') || errorText.includes('duplicate')) {
        console.log('   ℹ️  This might be a duplicate client error');
      }
      return;
    }

    const clientResult = await clientResponse.json();
    console.log('✅ Client created successfully!');
    console.log(`   Client ID: ${clientResult.data?.head_of_household?.ud_id || 'unknown'}`);
    console.log(`   Household ID: ${clientResult.data?.id || 'unknown'}`);
    
    return {
      success: true,
      clientData: clientResult.data,
      credentials: { udId, proGroupId }
    };

  } catch (error) {
    console.log(`❌ Network error: ${error.message}`);
    return null;
  }
}

async function testLocalAPIServer() {
  console.log('\n🧪 Testing Local API Server...');
  
  try {
    // Test if the API server is running
    const healthResponse = await fetch('http://localhost:3002/api/health');
    console.log(`   API server: ${healthResponse.status} ${healthResponse.statusText}`);
    
    // Test the API endpoint
    const apiResponse = await fetch('http://localhost:3002/api/snug-client', {
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

    console.log(`   API endpoint: ${apiResponse.status} ${apiResponse.statusText}`);
    
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      console.log('✅ Local API working:', data);
    } else {
      const errorText = await apiResponse.text();
      console.log('❌ Local API error:', errorText.substring(0, 200));
    }
  } catch (error) {
    console.log(`❌ Local server not accessible: ${error.message}`);
    console.log('   Make sure you run: npm run dev');
  }
}

// Run the tests
async function runTests() {
  console.log('🔍 GetSnug API Direct Test Suite\n');
  
  const result = await testDirectGetSnugAPI();
  await testLocalAPIServer();
  
  if (result && result.success) {
    console.log('\n✅ SUCCESS: GetSnug API is working!');
    console.log('   The issue is with the local API server configuration.');
    console.log('   Next step: Fix the local API endpoint routing.');
  } else {
    console.log('\n❌ ISSUE: GetSnug API is not working properly.');
    console.log('   Check credentials and API endpoint configuration.');
  }
}

runTests().catch(console.error);
