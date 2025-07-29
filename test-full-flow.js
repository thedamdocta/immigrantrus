#!/usr/bin/env node

// Comprehensive test script following the correct domain structure
import fs from 'fs';

const testFullAPIFlow = async () => {
  console.log('🔄 GetSnug Full API Flow Test');
  console.log('===============================\n');

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

  console.log('📋 Configuration:');
  console.log('   Auth Domain: https://auth.getsnug.com');
  console.log('   API Domain: https://api.getsnug.com');
  console.log(`   Email: ${email || '[NOT SET]'}`);
  console.log(`   Password: ${password ? '[SET]' : '[NOT SET]'}\n`);

  if (!email || !password) {
    console.error('❌ Missing credentials in .env.local file');
    return;
  }

  try {
    // Step 1: Authenticate using auth.getsnug.com
    console.log('🔄 Step 1: Authentication (auth.getsnug.com)...');
    console.log('   Endpoint: https://auth.getsnug.com/api/token/');
    
    const authStartTime = Date.now();
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

    const authResponseTime = Date.now() - authStartTime;
    console.log(`   Response time: ${authResponseTime}ms`);
    console.log(`   Status: ${authResponse.status} ${authResponse.statusText}`);

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('❌ Authentication failed!');
      console.error(`   Error: ${errorText}`);
      return;
    }

    const authData = await authResponse.json();
    console.log('✅ Authentication successful!');
    console.log(`   Access token: ${authData.access ? 'Present' : 'Missing'}`);
    console.log(`   Refresh token: ${authData.refresh ? 'Present' : 'Missing'}`);

    // Step 2: Get user profile using api.getsnug.com
    console.log('\n🔄 Step 2: User Profile (api.getsnug.com)...');
    console.log('   Endpoint: https://api.getsnug.com/api/v3/user-data/?expand=professional_group_role');

    const profileStartTime = Date.now();
    const profileResponse = await fetch('https://api.getsnug.com/api/v3/user-data/?expand=professional_group_role', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authData.access}`,
        'Content-Type': 'application/json'
      }
    });

    const profileResponseTime = Date.now() - profileStartTime;
    console.log(`   Response time: ${profileResponseTime}ms`);
    console.log(`   Status: ${profileResponse.status} ${profileResponse.statusText}`);

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error('❌ Profile fetch failed!');
      console.error(`   Error: ${errorText.substring(0, 300)}`);
      return;
    }

    const profileData = await profileResponse.json();
    console.log('✅ Profile data retrieved!');
    
    console.log('\n👤 User Profile:');
    console.log(`   Name: ${profileData.data?.full_name || 'Not available'}`);
    console.log(`   Email: ${profileData.data?.contact_email || 'Not available'}`);
    console.log(`   User ID: ${profileData.data?.ud_id || 'Not available'}`);
    
    // Debug: Log the entire profile data structure
    console.log('\n🔍 Debug - Full Profile Data:');
    console.log(JSON.stringify(profileData, null, 2));
    
    const proGroupData = profileData.data?.professional_group_role_user_data;
    if (proGroupData) {
      console.log('\n🏢 Professional Group:');
      console.log(`   Group ID: ${proGroupData.professional_group_id || 'Not available'}`);
      console.log(`   User Role: ${proGroupData.role || 'Not available'}`);
      console.log(`   Default Will Price: $${(proGroupData.default_will_price / 100).toFixed(2)}`);
      console.log(`   Default Trust Price: $${(proGroupData.default_trust_price / 100).toFixed(2)}`);
      console.log(`   Is Billing Contact: ${proGroupData.is_billing_contact ? '✅ Yes' : '❌ No'}`);

      // Step 3: Create client using api.getsnug.com (only if we have the group ID)
      if (proGroupData.professional_group_id) {
        console.log('\n🔄 Step 3: Client Creation (api.getsnug.com)...');

        const udId = profileData.data.ud_id;
        const proGroupId = proGroupData.professional_group_id;
        const clientEndpoint = `https://api.getsnug.com/api/v3/${udId}/pro-group/${proGroupId}/households/`;
      
      console.log(`   Endpoint: ${clientEndpoint}`);

      const testClientData = {
        client_data: {
          full_name: "Test Client",
          contact_email: "testclient@example.com",
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

      const clientStartTime = Date.now();
      const clientResponse = await fetch(clientEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authData.access}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testClientData)
      });

      const clientResponseTime = Date.now() - clientStartTime;
      console.log(`   Response time: ${clientResponseTime}ms`);
      console.log(`   Status: ${clientResponse.status} ${clientResponse.statusText}`);

      if (clientResponse.status === 201) {
        const clientData = await clientResponse.json();
        console.log('🎉 CLIENT CREATED SUCCESSFULLY!');
        console.log('\n📊 Client Details:');
        console.log(`   Name: ${clientData.data?.head_of_household?.full_name}`);
        console.log(`   Email: ${clientData.data?.head_of_household?.contact_email}`);
        console.log(`   Client ID: ${clientData.data?.head_of_household?.ud_id}`);
        console.log(`   State: ${clientData.data?.head_of_household?.household_state_code}`);
        
        console.log('\n🎉 SUCCESS: Full API flow completed successfully!');
        return { success: true, clientData };
      } else {
        const errorText = await clientResponse.text();
        console.error('❌ Client creation failed!');
        console.error(`   Error: ${errorText.substring(0, 300)}`);
        
        if (clientResponse.status === 400) {
          console.log('\n💡 400 Bad Request could mean:');
          console.log('   - Invalid client data structure');
          console.log('   - Missing required fields');
          console.log('   - Client email already exists');
        }
      }
      } else {
        console.error('❌ No professional group ID found');
        console.log('💡 Cannot create client without professional group ID');
      }
    } else {
      console.error('❌ No professional group data found');
      console.log('💡 User may not be associated with a professional group');
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('   Stack trace:', error.stack);
  }
};

// Run the test
testFullAPIFlow().then(result => {
  if (result && result.success) {
    console.log('\n✅ Full API flow test completed successfully!');
    process.exit(0);
  } else {
    console.log('\n❌ Full API flow test failed');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
