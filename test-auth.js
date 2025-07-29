#!/usr/bin/env node

// Dedicated authentication test script for GetSnug API
import fs from 'fs';

const testAuthentication = async () => {
  console.log('🔐 GetSnug API Authentication Test');
  console.log('=====================================\n');

  // Read credentials from .env.local file
  let baseUrl, email, password;
  
  try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const envLines = envContent.split('\n');
    
    envLines.forEach(line => {
      if (line.startsWith('VITE_SNUG_BASE_URL=')) {
        baseUrl = line.split('=')[1];
      } else if (line.startsWith('VITE_SNUG_EMAIL=')) {
        email = line.split('=')[1];
      } else if (line.startsWith('VITE_SNUG_PASSWORD=')) {
        password = line.split('=')[1];
      }
    });
  } catch (error) {
    console.error('❌ Could not read .env.local file:', error.message);
    console.log('💡 Please create a .env.local file with your GetSnug credentials\n');
    return;
  }

  // Display configuration
  console.log('📋 Configuration:');
  console.log(`   Base URL: ${baseUrl || 'https://auth.getsnug.com (default)'}`);
  console.log(`   Email: ${email || '[NOT SET]'}`);
  console.log(`   Password: ${password ? '[SET]' : '[NOT SET]'}\n`);

  // Validate credentials
  if (!email || !password) {
    console.error('❌ Missing credentials in .env.local file');
    console.log('💡 Required variables: VITE_SNUG_EMAIL, VITE_SNUG_PASSWORD\n');
    return;
  }

  // Use default base URL if not set
  const testBaseUrl = baseUrl || 'https://auth.getsnug.com';

  try {
    console.log('🔄 Step 1: Testing Authentication...');
    console.log(`   Endpoint: ${testBaseUrl}/api/token/`);
    
    const startTime = Date.now();
    const authResponse = await fetch(`${testBaseUrl}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });

    const responseTime = Date.now() - startTime;
    console.log(`   Response time: ${responseTime}ms`);
    console.log(`   Status: ${authResponse.status} ${authResponse.statusText}`);

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('❌ Authentication failed!');
      console.error(`   Error response: ${errorText}\n`);
      
      // Provide helpful error messages
      if (authResponse.status === 401) {
        console.log('💡 Common causes for 401 Unauthorized:');
        console.log('   - Incorrect email or password');
        console.log('   - Account may be locked or disabled');
        console.log('   - Email may not be verified\n');
      } else if (authResponse.status === 404) {
        console.log('💡 404 Not Found suggests:');
        console.log('   - Wrong base URL or endpoint');
        console.log('   - API may not be available at this URL\n');
      } else if (authResponse.status >= 500) {
        console.log('💡 Server error (5xx) suggests:');
        console.log('   - GetSnug API server issues');
        console.log('   - Temporary service outage\n');
      }
      return;
    }

    const authData = await authResponse.json();
    console.log('✅ Authentication successful!\n');
    
    // Analyze the response
    console.log('📊 Token Analysis:');
    console.log(`   Access token: ${authData.access ? '✅ Present' : '❌ Missing'}`);
    console.log(`   Refresh token: ${authData.refresh ? '✅ Present' : '❌ Missing'}`);
    
    if (authData.access) {
      // Decode JWT payload (basic info only, no verification)
      try {
        const payload = JSON.parse(atob(authData.access.split('.')[1]));
        console.log(`   Token expires: ${new Date(payload.exp * 1000).toLocaleString()}`);
        console.log(`   User ID: ${payload.user_id || 'Not found'}`);
        console.log(`   Token type: ${payload.token_type || 'access'}`);
      } catch (jwtError) {
        console.log('   Token format: Unable to decode (may be encrypted)');
      }
    }

    console.log('\n🔄 Step 2: Testing Token Validity...');
    console.log(`   Endpoint: ${testBaseUrl}/api/v3/user-data/?expand=professional_group_role`);

    const profileStartTime = Date.now();
    const profileResponse = await fetch(`${testBaseUrl}/api/v3/user-data/?expand=professional_group_role`, {
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
      console.error(`   Error response: ${errorText}\n`);
      
      if (profileResponse.status === 401) {
        console.log('💡 Token may be invalid or expired');
      } else if (profileResponse.status === 404) {
        console.log('💡 User may not have professional group access');
      }
      return;
    }

    const profileData = await profileResponse.json();
    console.log('✅ Profile data retrieved!\n');

    // Analyze profile data
    console.log('👤 User Profile:');
    console.log(`   Name: ${profileData.data?.full_name || 'Not available'}`);
    console.log(`   Email: ${profileData.data?.contact_email || 'Not available'}`);
    console.log(`   User ID: ${profileData.data?.ud_id || 'Not available'}`);
    
    console.log('\n🏢 Professional Group:');
    const proGroupData = profileData.data?.professional_group_role_user_data;
    if (proGroupData) {
      console.log(`   Group Name: ${proGroupData.professional_group?.name || 'Not available'}`);
      console.log(`   Group ID: ${proGroupData.professional_group?.id || 'Not available'}`);
      console.log(`   User Role: ${proGroupData.role || 'Not available'}`);
      console.log(`   Allow Custom Pricing: ${proGroupData.professional_group?.allow_agent_custom_client_pricing ? '✅ Yes' : '❌ No'}`);
      console.log(`   Allow Wills: ${proGroupData.professional_group?.allow_wills ? '✅ Yes' : '❌ No'}`);
      console.log(`   Allow Trusts: ${proGroupData.professional_group?.allow_trusts ? '✅ Yes' : '❌ No'}`);
    } else {
      console.log('   ❌ No professional group data found');
      console.log('   💡 User may not be associated with a professional group');
    }

    console.log('\n🎉 SUCCESS: Authentication flow completed successfully!');
    console.log('\n📝 Next Steps:');
    console.log('   1. You can now test client creation');
    console.log('   2. The API service should work with these credentials');
    console.log('   3. Consider running the full test script: node test-snug-api.js\n');

    return {
      success: true,
      baseUrl: testBaseUrl,
      accessToken: authData.access,
      userProfile: {
        ud_id: profileData.data?.ud_id,
        pro_group_id: proGroupData?.professional_group?.id,
        role: proGroupData?.role
      }
    };

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('   Stack trace:', error.stack);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.log('\n💡 Network error suggestions:');
      console.log('   - Check your internet connection');
      console.log('   - Verify the base URL is correct');
      console.log('   - Check if the API server is running');
    }
    
    return { success: false, error: error.message };
  }
};

// Run the test
testAuthentication().then(result => {
  if (result && result.success) {
    console.log('✅ Authentication test completed successfully');
    process.exit(0);
  } else {
    console.log('❌ Authentication test failed');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
