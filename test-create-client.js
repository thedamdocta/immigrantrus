#!/usr/bin/env node

// Test script to create a new client in GetSnug
import fs from 'fs';

const testClientCreation = async () => {
  console.log('🆕 GetSnug Client Creation Test');
  console.log('=================================\n');

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
    return;
  }

  const testBaseUrl = baseUrl || 'https://auth.getsnug.com';

  try {
    // Step 1: Authenticate
    console.log('🔄 Step 1: Authenticating...');
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

    if (!authResponse.ok) {
      console.error('❌ Authentication failed');
      return;
    }

    const authData = await authResponse.json();
    console.log('✅ Authentication successful!');

    // Step 2: Try different client creation endpoints
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

    // Try various possible client creation endpoints
    const possibleEndpoints = [
      '/api/clients/',
      '/api/v3/clients/',
      '/api/households/',
      '/api/v3/households/',
      '/clients/',
      '/households/',
      '/api/client/create/',
      '/api/v3/client/create/'
    ];

    console.log('\n🔄 Step 2: Testing client creation endpoints...');

    for (const endpoint of possibleEndpoints) {
      console.log(`\n   Trying: ${testBaseUrl}${endpoint}`);
      
      try {
        const clientResponse = await fetch(`${testBaseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authData.access}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testClientData)
        });

        console.log(`   Status: ${clientResponse.status} ${clientResponse.statusText}`);

        if (clientResponse.status === 201 || clientResponse.status === 200) {
          const clientData = await clientResponse.json();
          console.log('🎉 CLIENT CREATED SUCCESSFULLY!');
          console.log('   Endpoint that worked:', endpoint);
          console.log('   Response data:', JSON.stringify(clientData, null, 2));
          return { success: true, endpoint, clientData };
        } else if (clientResponse.status === 400) {
          const errorText = await clientResponse.text();
          console.log('   400 Bad Request - API responded but data may be invalid');
          console.log('   Error details:', errorText.substring(0, 200));
        } else if (clientResponse.status === 404) {
          console.log('   404 Not Found - Endpoint does not exist');
        } else if (clientResponse.status === 401) {
          console.log('   401 Unauthorized - Token may be invalid');
        } else if (clientResponse.status === 403) {
          console.log('   403 Forbidden - No permission to create clients');
        } else {
          const errorText = await clientResponse.text();
          console.log(`   ${clientResponse.status} - Other error:`, errorText.substring(0, 100));
        }
      } catch (fetchError) {
        console.log('   Network error:', fetchError.message.substring(0, 50));
      }
    }

    console.log('\n❌ None of the endpoints worked for client creation');
    console.log('\n💡 Possible reasons:');
    console.log('   - Client creation may require different data structure');
    console.log('   - May need professional group information first');
    console.log('   - Different authentication method may be required');
    console.log('   - API may not be fully implemented yet');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
};

// Run the test
testClientCreation().then(result => {
  if (result && result.success) {
    console.log('\n✅ Client creation test successful!');
    process.exit(0);
  } else {
    console.log('\n❌ Client creation test failed');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
