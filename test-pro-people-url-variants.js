#!/usr/bin/env node

// Test different URL patterns for Pro People Roles endpoint
import fs from 'fs';

const testProPeopleUrlVariants = async () => {
  console.log('🔍 Testing Pro People Roles URL Variants');
  console.log('========================================\n');

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

    // Test data
    const testClientData = {
      client_data: {
        full_name: "Test URL Variants",
        contact_email: "testurlvariants@example.com"
      },
      client_role: {}
    };

    // Try different URL patterns for pro-people-roles
    const urlVariants = [
      // From documentation (what we tried)
      `/${udId}/pro-group/${proGroupId}/pro-people-roles/`,
      
      // With API version prefixes
      `/api/v3/${udId}/pro-group/${proGroupId}/pro-people-roles/`,
      `/api/v2/${udId}/pro-group/${proGroupId}/pro-people-roles/`,
      `/api/v1/${udId}/pro-group/${proGroupId}/pro-people-roles/`,
      `/api/${udId}/pro-group/${proGroupId}/pro-people-roles/`,
      
      // Different path structures
      `/api/v3/pro-people-roles/`,
      `/api/pro-people-roles/`,
      `/pro-people-roles/`,
      
      // Alternative naming
      `/api/v3/${udId}/pro-group/${proGroupId}/people-roles/`,
      `/api/v3/${udId}/pro-group/${proGroupId}/client-roles/`,
      `/api/v3/${udId}/pro-group/${proGroupId}/roles/`,
      
      // Simplified patterns
      `/api/v3/pro-group/${proGroupId}/pro-people-roles/`,
      `/api/v3/pro-group/${proGroupId}/people-roles/`,
      `/api/v3/pro-group/${proGroupId}/client-roles/`,
      
      // User-focused patterns
      `/api/v3/user/${udId}/pro-people-roles/`,
      `/api/v3/user/${udId}/people-roles/`,
      `/api/v3/user/${udId}/client-roles/`,
    ];

    console.log('🔄 Testing Pro People Roles URL variants...\n');

    for (const endpoint of urlVariants) {
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

        console.log(`${endpoint.padEnd(80)} | ${response.status} ${response.statusText}`);
        
        if (response.status === 201 || response.status === 200) {
          const responseData = await response.json();
          console.log('🎉 WORKING ENDPOINT FOUND!');
          console.log(`   Endpoint: ${endpoint}`);
          console.log(`   Response:`, JSON.stringify(responseData, null, 2));
          return { success: true, endpoint, response: responseData };
        } else if (response.status === 400) {
          const errorText = await response.text();
          console.log(`   └── 400 Details: ${errorText.substring(0, 100)}`);
        } else if (response.status === 405) {
          console.log(`   └── 405 Method Not Allowed - Endpoint exists but wrong method`);
        } else if (response.status === 403) {
          console.log(`   └── 403 Forbidden - Permission issue`);
        }
        
      } catch (fetchError) {
        console.log(`${endpoint.padEnd(80)} | ERROR: ${fetchError.message}`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log('\n❌ No working pro-people-roles endpoint found');
    console.log('\n💡 This suggests the API may not be implemented yet or uses a different structure.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testProPeopleUrlVariants().then(result => {
  if (result && result.success) {
    console.log('\n✅ Working pro-people-roles endpoint discovered!');
    process.exit(0);
  } else {
    console.log('\n❌ No working pro-people-roles endpoints found');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
