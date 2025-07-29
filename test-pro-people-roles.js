#!/usr/bin/env node

// Test script for the new Pro People Roles endpoint
import fs from 'fs';

const testProPeopleRolesEndpoint = async () => {
  console.log('🧪 Testing Pro People Roles Endpoint');
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
    console.log('🔄 Step 2: Retrieving user profile...');
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
    console.log(`   User ID: ${udId}`);
    console.log(`   Professional Group ID: ${proGroupId}\n`);

    // Step 3: Test Pro People Roles endpoint
    console.log('🔄 Step 3: Testing Pro People Roles endpoint...');
    
    const newEndpoint = `/${udId}/pro-group/${proGroupId}/pro-people-roles/`;
    const fullUrl = `https://api.getsnug.com${newEndpoint}`;
    
    console.log(`   New Endpoint: ${newEndpoint}`);
    console.log(`   Full URL: ${fullUrl}`);

    // Simplified test data - just name and email
    const testClientData = {
      client_data: {
        full_name: "Test Client Pro People",
        contact_email: "testproppeople@example.com"
      },
      client_role: {
        // Empty - let GetSnug use defaults
      }
    };

    console.log('\n📤 Request Data:');
    console.log(JSON.stringify(testClientData, null, 2));

    const clientStartTime = Date.now();
    const clientResponse = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authData.access}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testClientData)
    });

    const clientResponseTime = Date.now() - clientStartTime;
    console.log(`\n📥 Response:`);
    console.log(`   Response time: ${clientResponseTime}ms`);
    console.log(`   Status: ${clientResponse.status} ${clientResponse.statusText}`);

    if (clientResponse.status === 201) {
      const responseData = await clientResponse.json();
      console.log('🎉 SUCCESS! Client created successfully!');
      console.log('\n📊 Response Data:');
      console.log(JSON.stringify(responseData, null, 2));
      
      console.log('\n✅ ENDPOINT VERIFIED! The Pro People Roles API is working!');
      return { success: true, endpoint: newEndpoint, response: responseData };
      
    } else if (clientResponse.status === 200) {
      const responseData = await clientResponse.json();
      console.log('🎉 SUCCESS! Request processed successfully!');
      console.log('\n📊 Response Data:');
      console.log(JSON.stringify(responseData, null, 2));
      return { success: true, endpoint: newEndpoint, response: responseData };
      
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
          console.log('   Raw Error:', errorText.substring(0, 200));
        }
        console.log('   - Check if required fields are missing');
        console.log('   - Check if client email already exists');
        console.log('   - Verify data format matches API expectations');
      } else if (clientResponse.status === 403) {
        console.log('\n💡 403 Forbidden could mean:');
        console.log('   - Insufficient permissions');
        console.log('   - Professional group restrictions');
      } else if (clientResponse.status === 404) {
        console.log('\n💡 404 Not Found means:');
        console.log('   - Endpoint still not implemented');
        console.log('   - URL structure may be incorrect');
      }
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('   Stack trace:', error.stack);
  }
};

// Run the test
testProPeopleRolesEndpoint().then(result => {
  if (result && result.success) {
    console.log('\n🎉 Pro People Roles endpoint test SUCCESSFUL!');
    console.log('   Ready to update production code with working endpoint.');
    process.exit(0);
  } else {
    console.log('\n❌ Pro People Roles endpoint test FAILED');
    console.log('   Do not update production code yet.');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
