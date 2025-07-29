#!/usr/bin/env node

// Test the updated SnugApiService with the working Pro People Roles endpoint
import { SnugApiService } from './src/lib/snugApi.ts';

const testUpdatedSnugApi = async () => {
  console.log('🔧 Testing Updated SnugApiService');
  console.log('=================================\n');

  try {
    // Initialize the service
    console.log('🔄 Step 1: Initializing SnugApiService...');
    const snugService = new SnugApiService();
    console.log('✅ Service initialized\n');

    // Test authentication
    console.log('🔄 Step 2: Testing authentication...');
    const authStartTime = Date.now();
    await snugService.authenticate();
    const authTime = Date.now() - authStartTime;
    console.log(`✅ Authentication successful (${authTime}ms)\n`);

    // Test user profile retrieval
    console.log('🔄 Step 3: Testing user profile retrieval...');
    const profileStartTime = Date.now();
    const userProfile = await snugService.getUserProfile();
    const profileTime = Date.now() - profileStartTime;
    
    console.log(`✅ User profile retrieved (${profileTime}ms)`);
    console.log(`   User ID: ${userProfile.ud_id}`);
    console.log(`   Professional Group ID: ${userProfile.pro_group_id}`);
    console.log(`   Role: ${userProfile.role}\n`);

    // Test client creation with the new endpoint
    console.log('🔄 Step 4: Testing client creation...');
    
    // Create test client data using the static helper method
    const testClientData = SnugApiService.createDefaultClientData(
      'Final Test',
      'Client Updated API',
      'finaltestupdated@example.com'
    );

    console.log('📤 Client data to be sent:');
    console.log(JSON.stringify(testClientData, null, 2));

    const clientStartTime = Date.now();
    const clientResponse = await snugService.createClient(testClientData);
    const clientTime = Date.now() - clientStartTime;

    console.log(`\n✅ Client created successfully (${clientTime}ms)!`);
    console.log('\n📊 Client Response Data:');
    console.log(`   Client ID: ${clientResponse.data?.id || 'N/A'}`);
    console.log(`   Role: ${clientResponse.data?.role || 'N/A'}`);
    console.log(`   Client Name: ${clientResponse.data?.role_target_user_data?.full_name || 'N/A'}`);
    console.log(`   Client Email: ${clientResponse.data?.role_target_user_data?.contact_email || 'N/A'}`);
    console.log(`   Will Price: $${clientResponse.data?.will_price ? (clientResponse.data.will_price / 100).toFixed(2) : 'N/A'}`);
    console.log(`   Trust Price: $${clientResponse.data?.trust_price ? (clientResponse.data.trust_price / 100).toFixed(2) : 'N/A'}`);
    console.log(`   Professional: ${clientResponse.data?.user_data?.full_name || 'N/A'}`);
    console.log(`   Created At: ${clientResponse.data?.created_at || 'N/A'}`);

    console.log('\n🎉 ALL TESTS PASSED!');
    console.log('✅ Authentication: Working');
    console.log('✅ User Profile: Working');
    console.log('✅ Client Creation: Working');
    console.log('✅ Pro People Roles Endpoint: Working');
    
    console.log('\n🚀 The GetSnug API integration is fully functional!');
    
    return { 
      success: true, 
      userProfile, 
      clientResponse,
      timings: {
        auth: authTime,
        profile: profileTime,
        client: clientTime
      }
    };

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('   Error details:', error);
    return { success: false, error: error.message };
  }
};

// Run the comprehensive test
testUpdatedSnugApi().then(result => {
  if (result.success) {
    console.log('\n🎉 COMPREHENSIVE TEST SUCCESSFUL!');
    console.log('   The updated SnugApiService is ready for production use.');
    console.log('\n📋 Summary:');
    console.log(`   - Authentication time: ${result.timings.auth}ms`);
    console.log(`   - Profile retrieval time: ${result.timings.profile}ms`);
    console.log(`   - Client creation time: ${result.timings.client}ms`);
    console.log(`   - Total API flow time: ${result.timings.auth + result.timings.profile + result.timings.client}ms`);
    process.exit(0);
  } else {
    console.log('\n❌ COMPREHENSIVE TEST FAILED');
    console.log(`   Error: ${result.error}`);
    console.log('   The API integration needs further debugging.');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Unexpected test error:', error);
  process.exit(1);
});
