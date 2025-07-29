#!/usr/bin/env node

// Test various client creation endpoint patterns
import fs from 'fs';

const testClientEndpoints = async () => {
  console.log('🔍 GetSnug Client Endpoint Discovery');
  console.log('====================================\n');

  // Read credentials from .env.local file
  let email, password;
  
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const envLines = envContent.split('\n');
    
    envLines.forEach(line => {
      if (line.startsWith('VITE_SNUG_EMAIL=')) {
        email = line.split('=')[1];
      } else if (line.startsWith('VITE_SNUG_PASSWORD=')) {
        password = line.split('=')[1];
      }
    });
  } catch (error) {
    console.error('❌ Could not read .env.local file:', error.message);
    return;
  }

  if (!email || !password) {
    console.error('❌ Missing credentials');
    return;
  }

  try {
    // Step 1: Authenticate
    console.log('🔄 Step 1: Authenticating...');
    const authResponse = await fetch('https://auth.getsnug.com/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });

    const authData = await authResponse.json();
    console.log('✅ Authentication successful!');

    // Step 2: Get profile
    const profileResponse = await fetch('https://api.getsnug.com/api/v3/user-data/?expand=professional_group_role', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authData.access}`,
        'Content-Type': 'application/json'
      }
    });

    const profileData = await profileResponse.json();
    const udId = profileData.data.ud_id;
    const proGroupId = profileData.data.professional_group_role_user_data.professional_group_id;

    console.log(`✅ Profile retrieved - UD ID: ${udId}`);
    console.log(`✅ Professional Group ID: ${proGroupId}\n`);

    // Test client data
    const testClientData = {
      client_data: {
        full_name: "Test Client Discovery",
        contact_email: "testdiscovery@example.com",
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
        professional_pricing_option: "DEFAULT",
        block_will: false,
        block_trust: false
      }
    };

    // Try various endpoint patterns
    const endpointPatterns = [
      // Original documented pattern
      `/api/v3/${udId}/pro-group/${proGroupId}/households/`,
      
      // Alternative patterns
      `/api/v3/households/`,
      `/api/households/`,
      `/api/v3/clients/`,
      `/api/clients/`,
      `/households/`,
      `/clients/`,
      
      // Professional group focused patterns
      `/api/v3/pro-group/${proGroupId}/households/`,
      `/api/v3/pro-group/${proGroupId}/clients/`,
      `/api/pro-group/${proGroupId}/households/`,
      `/api/pro-group/${proGroupId}/clients/`,
      
      // User focused patterns
      `/api/v3/user/${udId}/households/`,
      `/api/v3/user/${udId}/clients/`,
      `/api/user/${udId}/households/`,
      `/api/user/${udId}/clients/`,
      
      // Different API versions
      `/api/v1/households/`,
      `/api/v1/clients/`,
      `/api/v2/households/`,
      `/api/v2/clients/`,
      
      // Create specific endpoints
      `/api/v3/create/household/`,
      `/api/v3/create/client/`,
      `/api/create/household/`,
      `/api/create/client/`,
      
      // Professional specific endpoints
      `/api/v3/professional/households/`,
      `/api/v3/professional/clients/`,
      `/api/professional/households/`,
      `/api/professional/clients/`,
    ];

    console.log('🔄 Testing client creation endpoints...\n');

    for (const endpoint of endpointPatterns) {
      const fullUrl = `https://api.getsnug.com${endpoint}`;
      
      try {
        const response = await fetch(fullUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authData.access}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testClientData)
        });

        console.log(`${endpoint.padEnd(60)} | ${response.status} ${response.statusText}`);
        
        if (response.status === 201 || response.status === 200) {
          const responseData = await response.json();
          console.log('🎉 SUCCESS! Working endpoint found:');
          console.log(`   Endpoint: ${endpoint}`);
          console.log(`   Response:`, JSON.stringify(responseData, null, 2));
          return { success: true, endpoint, response: responseData };
        } else if (response.status === 400) {
          const errorText = await response.text();
          console.log(`   └── 400 Details: ${errorText.substring(0, 100)}`);
        } else if (response.status === 401) {
          console.log(`   └── 401 Unauthorized - Token issue`);
        } else if (response.status === 403) {
          console.log(`   └── 403 Forbidden - Permission issue`);
        } else if (response.status === 405) {
          console.log(`   └── 405 Method Not Allowed - Endpoint exists but wrong method`);
        }
        
      } catch (fetchError) {
        console.log(`${endpoint.padEnd(60)} | ERROR: ${fetchError.message.substring(0, 30)}`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n❌ No working client creation endpoint found');
    console.log('\n💡 This suggests:');
    console.log('   - Client creation API may not be implemented yet');
    console.log('   - Different authentication/setup may be required');
    console.log('   - May need to contact GetSnug for correct endpoints');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testClientEndpoints().then(result => {
  if (result && result.success) {
    console.log('\n✅ Working endpoint discovered!');
    process.exit(0);
  } else {
    console.log('\n❌ No working endpoints found');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
