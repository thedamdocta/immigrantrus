// Quick test script to verify Snug API integration
import fs from 'fs';

const testSnugAPI = async () => {
  // Read credentials from .env.local file
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const envLines = envContent.split('\n');
  
  let baseUrl, email, password;
  
  envLines.forEach(line => {
    if (line.startsWith('VITE_SNUG_BASE_URL=')) {
      baseUrl = line.split('=')[1];
    } else if (line.startsWith('VITE_SNUG_EMAIL=')) {
      email = line.split('=')[1];
    } else if (line.startsWith('VITE_SNUG_PASSWORD=')) {
      password = line.split('=')[1];
    }
  });

  console.log('📋 Using credentials from .env.local:');
  console.log('Base URL:', baseUrl);
  console.log('Email:', email);
  console.log('Password:', password ? '[SET]' : '[MISSING]');

  try {
    console.log('\n🔄 Using CORRECT API endpoints from documentation...');
    
    // Try multiple possible base URLs, starting with the new auth domain
    const baseUrls = [
      'https://auth.getsnug.com',        // Updated base URL
      'https://api.staging.getsnug.com', // From documentation
      'https://api.getsnug.com',         // From documentation
      'https://staging.api.getsnug.com', // Alternative staging
      'https://app.getsnug.com/api',     // API via app subdomain
      'https://getsnug.com/api',         // Direct domain
      'https://api-staging.getsnug.com', // Alternative staging format
      'https://prod.api.getsnug.com'     // Alternative production
    ];
    
    for (const testBaseUrl of baseUrls) {
      console.log(`\n🔄 Step 1: Trying ${testBaseUrl}/api/token/`);
      
      const authResponse = await fetch(`${testBaseUrl}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      console.log(`Auth response status: ${authResponse.status}`);
      
      if (!authResponse.ok) {
        const errorText = await authResponse.text();
        console.error(`❌ Authentication failed for ${testBaseUrl}:`, errorText.substring(0, 200));
        continue; // Try next URL
      }

      console.log(`✅ Found working base URL: ${testBaseUrl}`);
      baseUrl = testBaseUrl; // Update baseUrl for subsequent calls
      break;
    }
    
    // If no working URL found, exit
    if (!baseUrl.includes('staging') && !baseUrl.includes('getsnug.com')) {
      console.error('❌ No working base URL found');
      return;
    }
    
    // Re-authenticate with working base URL
    const authResponse = await fetch(`${baseUrl}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const authData = await authResponse.json();
    console.log('✅ Authentication successful!');
    console.log('Access token received:', authData.access ? 'Yes' : 'No');
    console.log('Refresh token received:', authData.refresh ? 'Yes' : 'No');

    // Step 2: Get user profile and professional group information
    console.log('\n🔄 Step 2: Getting user profile and professional group info...');
    
    const profileResponse = await fetch(`${baseUrl}/api/v3/user-data/?expand=professional_group_role`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authData.access}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`Profile response status: ${profileResponse.status}`);
    
    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      console.error('❌ Profile fetch failed:', errorText);
      return;
    }

    const profileData = await profileResponse.json();
    console.log('✅ Profile data received!');
    console.log('User ID (ud_id):', profileData.data?.ud_id);
    console.log('Professional Group ID:', profileData.data?.professional_group_role_user_data?.professional_group?.id);
    console.log('User role:', profileData.data?.professional_group_role_user_data?.role);

    const udId = profileData.data.ud_id;
    const proGroupId = profileData.data.professional_group_role_user_data.professional_group.id;

    // Step 3: Create a test client
    console.log('\n🔄 Step 3: Creating test client...');
    
    const testClientData = {
      client_data: {
        full_name: "Test User",
        contact_email: "test@example.com",
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

    const clientResponse = await fetch(`${baseUrl}/api/v3/${udId}/pro-group/${proGroupId}/households/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authData.access}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testClientData)
    });

    console.log(`Client creation status: ${clientResponse.status}`);
    
    if (clientResponse.status === 201) {
      const clientData = await clientResponse.json();
      console.log('🎉 CLIENT CREATED SUCCESSFULLY!');
      console.log('Client name:', clientData.data?.head_of_household?.full_name);
      console.log('Client email:', clientData.data?.head_of_household?.contact_email);
      console.log('Client ID:', clientData.data?.head_of_household?.ud_id);
      
      return {
        success: true,
        method: 'JWT',
        apiEndpoint: `/api/v3/${udId}/pro-group/${proGroupId}/households/`,
        clientData: clientData
      };
    } else {
      const errorText = await clientResponse.text();
      console.error('❌ Client creation failed:', errorText);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
};

testSnugAPI();
