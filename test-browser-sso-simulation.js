#!/usr/bin/env node

// Simulate what happens when a user completes Google SSO on the website
import fs from 'fs';

const testBrowserSSOSimulation = async () => {
  console.log('🌐 Browser SSO Simulation Test');
  console.log('===============================\n');

  // Read credentials from .env.local file (simulating browser environment)
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

  console.log('📋 Simulating Browser Environment:');
  console.log(`   VITE_SNUG_EMAIL: ${email || '[NOT SET]'}`);
  console.log(`   VITE_SNUG_PASSWORD: ${password ? '[SET]' : '[NOT SET]'}\n`);

  if (!email || !password) {
    console.error('❌ Missing VITE_ environment variables for browser');
    return;
  }

  // Simulate what the SnugApiService does in the browser
  console.log('🔄 Step 1: Simulating SnugApiService instantiation...');
  
  const mockImportMeta = {
    env: {
      VITE_SNUG_EMAIL: email,
      VITE_SNUG_PASSWORD: password
    }
  };
  
  console.log('✅ Mock import.meta.env:', mockImportMeta.env);

  // Simulate the exact process that happens in success-message.tsx
  console.log('\n🔄 Step 2: Simulating success-message.tsx OAuth flow...');
  
  // Simulate Clerk user data after Google SSO
  const mockClerkUser = {
    firstName: 'Test',
    lastName: 'GoogleUser',
    emailAddresses: [{ emailAddress: 'testgoogleuser@gmail.com' }],
    createdAt: new Date().toISOString()
  };
  
  console.log('👤 Mock Clerk User Data:');
  console.log(`   firstName: ${mockClerkUser.firstName}`);
  console.log(`   lastName: ${mockClerkUser.lastName}`);
  console.log(`   email: ${mockClerkUser.emailAddresses[0].emailAddress}`);

  try {
    // Step 3: Test the actual API flow
    console.log('\n🔄 Step 3: Testing GetSnug API with simulated data...');
    
    // Authenticate
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

    if (!authResponse.ok) {
      throw new Error(`Authentication failed: ${authResponse.statusText}`);
    }

    const authData = await authResponse.json();
    console.log('✅ Authentication successful');

    // Get profile
    const profileResponse = await fetch('https://api.getsnug.com/api/v3/user-data/?expand=professional_group_role', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authData.access}`,
        'Content-Type': 'application/json'
      }
    });

    if (!profileResponse.ok) {
      throw new Error(`Profile fetch failed: ${profileResponse.statusText}`);
    }

    const profileData = await profileResponse.json();
    const udId = profileData.data.ud_id;
    const proGroupId = profileData.data.professional_group_role_user_data.professional_group_id;

    console.log('✅ Profile retrieved');
    console.log(`   User ID: ${udId}`);
    console.log(`   Professional Group ID: ${proGroupId}`);

    // Create client data exactly as the browser would
    const clientData = {
      client_data: {
        full_name: `${mockClerkUser.firstName} ${mockClerkUser.lastName}`,
        contact_email: mockClerkUser.emailAddresses[0].emailAddress
      },
      client_role: {}
    };

    console.log('\n📤 Client Data (as browser would send):');
    console.log(JSON.stringify(clientData, null, 2));

    // Test client creation
    const clientResponse = await fetch(`https://api.getsnug.com/api/v3/${udId}/pro-group/${proGroupId}/pro-people-roles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.access}`,
      },
      body: JSON.stringify(clientData)
    });

    console.log(`\n📥 GetSnug API Response:`);
    console.log(`   Status: ${clientResponse.status} ${clientResponse.statusText}`);

    if (clientResponse.status === 201) {
      const responseData = await clientResponse.json();
      console.log('🎉 SUCCESS! Client would be created in browser!');
      console.log('\n📊 Created Client Details:');
      console.log(`   Client ID: ${responseData.data?.id}`);
      console.log(`   Role: ${responseData.data?.role}`);
      console.log(`   Client Name: ${responseData.data?.role_target_user_data?.full_name}`);
      console.log(`   Client Email: ${responseData.data?.role_target_user_data?.contact_email}`);
      console.log(`   Will Price: $${(responseData.data?.will_price / 100).toFixed(2)}`);
      console.log(`   Trust Price: $${(responseData.data?.trust_price / 100).toFixed(2)}`);
      
      console.log('\n✅ BROWSER SSO SIMULATION: SUCCESS!');
      console.log('   The API integration should work in the browser.');
      console.log('\n🔍 Possible issues in actual browser:');
      console.log('   1. JavaScript errors preventing execution');
      console.log('   2. Network/CORS issues');
      console.log('   3. Clerk user data not available immediately');
      console.log('   4. Console errors being suppressed');
      
      return { success: true, client: responseData.data };
      
    } else {
      const errorText = await clientResponse.text();
      console.error('❌ Client creation failed!');
      console.error(`   Error: ${errorText}`);
      
      console.log('\n💡 This explains why GetSnug clients are not created in browser!');
      return { success: false, error: errorText };
    }

  } catch (error) {
    console.error('❌ Simulation failed:', error.message);
    console.log('\n💡 This error would prevent GetSnug client creation in browser!');
    return { success: false, error: error.message };
  }
};

// Run the simulation
testBrowserSSOSimulation().then(result => {
  if (result.success) {
    console.log('\n🏆 SIMULATION RESULT: Browser SSO should work!');
    console.log('   Check browser console for actual errors.');
  } else {
    console.log('\n❌ SIMULATION RESULT: Browser SSO will fail!');
    console.log(`   Error: ${result.error}`);
  }
}).catch(error => {
  console.error('❌ Unexpected simulation error:', error);
});
