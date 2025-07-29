#!/usr/bin/env node

// Final integration test using the working Pro People Roles endpoint
import fs from 'fs';

const testFinalIntegration = async () => {
  console.log('🎯 Final GetSnug Integration Test');
  console.log('==================================\n');

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
    // Step 1: Authenticate
    console.log('🔄 Step 1: Authentication...');
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
    console.log('✅ Authentication successful!\n');

    // Step 2: Get user profile
    console.log('🔄 Step 2: User Profile Retrieval...');
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
    const udId = profileData.data.ud_id;
    const proGroupId = profileData.data.professional_group_role_user_data.professional_group_id;

    console.log('✅ Profile retrieved successfully!');
    console.log(`   User Name: ${profileData.data.full_name}`);
    console.log(`   User ID: ${udId}`);
    console.log(`   Professional Group ID: ${proGroupId}`);
    console.log(`   Role: ${profileData.data.professional_group_role_user_data.role}\n`);

    // Step 3: Create client using working Pro People Roles endpoint
    console.log('🔄 Step 3: Client Creation (Pro People Roles)...');
    
    const clientEndpoint = `/api/v3/${udId}/pro-group/${proGroupId}/pro-people-roles/`;
    const fullUrl = `https://api.getsnug.com${clientEndpoint}`;
    
    console.log(`   Endpoint: ${clientEndpoint}`);

    // Simplified client data matching the new API structure
    const clientData = {
      client_data: {
        full_name: "Final Integration Test Client",
        contact_email: "finalintegration@example.com"
      },
      client_role: {
        // Empty - use GetSnug defaults
      }
    };

    console.log('\n📤 Request Data:');
    console.log(JSON.stringify(clientData, null, 2));

    const clientStartTime = Date.now();
    const clientResponse = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authData.access}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientData)
    });

    const clientResponseTime = Date.now() - clientStartTime;
    console.log(`\n📥 Response:`);
    console.log(`   Response time: ${clientResponseTime}ms`);
    console.log(`   Status: ${clientResponse.status} ${clientResponse.statusText}`);

    if (clientResponse.status === 201) {
      const responseData = await clientResponse.json();
      console.log('🎉 CLIENT CREATED SUCCESSFULLY!');
      
      console.log('\n📊 Client Details:');
      console.log(`   Client ID: ${responseData.data?.id}`);
      console.log(`   Role: ${responseData.data?.role}`);
      console.log(`   Client Name: ${responseData.data?.role_target_user_data?.full_name}`);
      console.log(`   Client Email: ${responseData.data?.role_target_user_data?.contact_email}`);
      console.log(`   Client User ID: ${responseData.data?.role_target_user_data?.ud_id}`);
      console.log(`   Will Price: $${(responseData.data?.will_price / 100).toFixed(2)}`);
      console.log(`   Trust Price: $${(responseData.data?.trust_price / 100).toFixed(2)}`);
      console.log(`   Professional: ${responseData.data?.user_data?.full_name}`);
      console.log(`   Created At: ${responseData.data?.created_at}`);
      
      console.log('\n🎉 COMPLETE SUCCESS!');
      console.log('✅ Authentication: Working');
      console.log('✅ User Profile: Working');
      console.log('✅ Client Creation: Working');
      console.log('✅ Pro People Roles Endpoint: Working');
      
      console.log('\n📊 Performance Summary:');
      console.log(`   Authentication: ${authResponseTime}ms`);
      console.log(`   Profile Retrieval: ${profileResponseTime}ms`);
      console.log(`   Client Creation: ${clientResponseTime}ms`);
      console.log(`   Total Flow Time: ${authResponseTime + profileResponseTime + clientResponseTime}ms`);
      
      console.log('\n🚀 GetSnug API Integration is FULLY FUNCTIONAL!');
      console.log('   Ready for production deployment.');
      
      return { 
        success: true, 
        client: responseData.data,
        timings: {
          auth: authResponseTime,
          profile: profileResponseTime,
          client: clientResponseTime,
          total: authResponseTime + profileResponseTime + clientResponseTime
        }
      };
      
    } else {
      const errorText = await clientResponse.text();
      console.error('❌ Client creation failed!');
      console.error(`   Error Response: ${errorText}`);
      
      if (clientResponse.status === 400) {
        console.log('\n💡 400 Bad Request Analysis:');
        try {
          const errorJson = JSON.parse(errorText);
          console.log('   Parsed Error:', JSON.stringify(errorJson, null, 2));
        } catch {
          console.log('   Raw Error:', errorText.substring(0, 300));
        }
      }
    }

  } catch (error) {
    console.error('❌ Integration test failed with error:', error.message);
    console.error('   Stack trace:', error.stack);
  }
};

// Run the final integration test
testFinalIntegration().then(result => {
  if (result && result.success) {
    console.log('\n🏆 FINAL INTEGRATION TEST: SUCCESS!');
    console.log('   GetSnug API integration is complete and ready for production.');
    console.log(`   Total API flow completed in ${result.timings.total}ms`);
    process.exit(0);
  } else {
    console.log('\n❌ FINAL INTEGRATION TEST: FAILED');
    console.log('   API integration needs further work.');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
