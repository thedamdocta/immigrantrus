// Test script to verify the correct GetSnug API 3-step approach
const fetch = require('node-fetch');

// Correct configuration from documentation
const AUTH_BASE_URL = 'https://auth.getsnug.com';
const API_BASE_URL = 'https://api.getsnug.com';

// Configuration from environment
const SNUG_EMAIL = 'marlene@fordelaw.org';
const SNUG_PASSWORD = 'Godfrey2025$';

async function testCorrectAPI() {
  console.log('🔍 Testing Correct GetSnug API 3-Step Approach...\n');

  try {
    // Step 1: Authenticate with GetSnug
    console.log('🔄 Step 1: Authenticating with GetSnug...');
    const authResponse = await fetch(`${AUTH_BASE_URL}/api/token/`, {
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
    const accessToken = authData.access;
    console.log('✅ Authentication successful');
    console.log(`🔑 Token: ${accessToken ? 'Received' : 'Missing'}`);

    // Step 2: Get user profile and professional group information
    console.log('\n🔄 Step 2: Getting user profile...');
    const profileResponse = await fetch(`${API_BASE_URL}/api/v3/user-data/?expand=professional_group_role`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log(`📡 Profile Response: ${profileResponse.status} ${profileResponse.statusText}`);
    
    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.log(`❌ Profile failed: ${errorText.substring(0, 200)}...`);
      return false;
    }

    const profileData = await profileResponse.json();
    const userData = profileData.data;
    
    if (!userData || !userData.ud_id || !userData.professional_group_role_user_data) {
      console.log('❌ Missing required profile data');
      return false;
    }

    const udId = userData.ud_id;
    const proGroupId = userData.professional_group_role_user_data.professional_group.id;
    
    console.log(`✅ Profile retrieved - UD ID: ${udId}, Pro Group ID: ${proGroupId}`);

    // Step 3: Create client
    console.log('\n🔄 Step 3: Creating client...');
    const clientData = {
      client_data: {
        full_name: `${'Devon'} ${'Smart Jr'}`,
        contact_email: 'devonsmartjr@gmail.com',
        estate_plan_foundation: "will",
        value_of_assets: "up_to_five",
        household_state_code: "NY",
        show_household_onboarding_requirement: false,
        blended_family: false,
        children: "none"
      },
      client_role: {
        recommendation_trust: false,
        recommendation_will: true,
        recommendation_fpoa: false,
        recommendation_hcd: false,
        will_price: 29999,
        trust_price: 59999,
        professional_pricing_option: "DEFAULT",
        block_will: false,
        block_trust: false
      }
    };

    const clientUrl = `${API_BASE_URL}/api/v3/${udId}/pro-group/${proGroupId}/households/`;
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
  console.log('🧪 Starting Correct GetSnug API Test...\n');
  
  const success = await testCorrectAPI();
  
  if (success) {
    console.log('\n✅ API test completed successfully');
  } else {
    console.log('\n❌ API test failed - check configuration');
    console.log('💡 Make sure credentials are correct and professional group is configured');
  }
}

// Run the test
runTest().catch(console.error);
