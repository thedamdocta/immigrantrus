// Test script to find the correct GetSnug API endpoints
const fetch = require('node-fetch');

// Test configuration
const SNUG_EMAIL = 'marlene@fordelaw.org';
const SNUG_PASSWORD = 'Godfrey2025$';

async function testGetSnugAPI() {
  console.log('🔍 Testing GetSnug API Discovery...\n');
  
  // Try different endpoint patterns
  const endpoints = [
    'https://app.getsnug.com/api/v1',
    'https://app.getsnug.com/api',
    'https://getsnug.com/api',
    'https://auth.getsnug.com/api',
    'https://api.getsnug.com/v1',
    'https://api.getsnug.com'
  ];
  
  for (const baseUrl of endpoints) {
    console.log(`🧪 Testing: ${baseUrl}`);
    
    try {
      // Test authentication
      const authResponse = await fetch(`${baseUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: SNUG_EMAIL,
          password: SNUG_PASSWORD
        })
      });

      console.log(`   📡 Auth: ${authResponse.status} ${authResponse.statusText}`);
      
      if (authResponse.ok) {
        const authData = await authResponse.json();
        console.log(`   ✅ Auth successful at ${baseUrl}`);
        console.log(`   🔑 Token: ${authData.access_token ? 'Received' : 'Missing'}`);
        
        // Test client creation
        const clientResponse = await fetch(`${baseUrl}/clients`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.access_token}`
          },
          body: JSON.stringify({
            client_data: {
              full_name: 'Devon Smart Jr',
              contact_email: 'devonsmartjr@gmail.com',
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
          })
        });
        
        console.log(`   📡 Client: ${clientResponse.status} ${clientResponse.statusText}`);
        
        if (clientResponse.ok) {
          const clientData = await clientResponse.json();
          console.log(`   ✅ Client created: ${clientData.id}`);
          return { baseUrl, token: authData.access_token, client: clientData };
        } else {
          const errorText = await clientResponse.text();
          console.log(`   ❌ Client error: ${errorText}`);
        }
      } else {
        // Check if it's returning HTML
        const text = await authResponse.text();
        if (text.includes('<!DOCTYPE') || text.includes('<html')) {
          console.log(`   ❌ HTML response - likely wrong endpoint`);
        } else {
          console.log(`   ❌ Auth error: ${text}`);
        }
      }
    } catch (error) {
      console.log(`   ❌ Network error: ${error.message}`);
    }
    
    console.log('');
  }
  
  return null;
}

async function testLocalVercelAPI() {
  console.log('\n🧪 Testing Local Vercel API...');
  
  try {
    const response = await fetch('http://localhost:3000/api/snug-client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: 'Devon',
        lastName: 'Smart Jr',
        email: 'devonsmartjr@gmail.com'
      })
    });

    console.log(`📡 Local API Response: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Local API working:', data);
    } else {
      const errorText = await response.text();
      console.log('❌ Local API error:', errorText);
    }
  } catch (error) {
    console.log('❌ Local API not available:', error.message);
  }
}

async function testWithCorrectEndpoint() {
  console.log('\n🔍 Testing with corrected endpoint...');
  
  // Based on research, let's try the correct GetSnug API
  const baseUrl = 'https://app.getsnug.com';
  
  try {
    console.log(`🧪 Testing authentication at ${baseUrl}/api/auth/login`);
    
    const authResponse = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: SNUG_EMAIL,
        password: SNUG_PASSWORD
      })
    });

    console.log(`📡 Auth Response: ${authResponse.status} ${authResponse.statusText}`);
    
    if (authResponse.ok) {
      const authData = await authResponse.json();
      console.log('✅ Authentication successful');
      console.log('🔑 Token received');
      
      // Test client creation
      console.log(`🧪 Testing client creation at ${baseUrl}/api/clients`);
      
      const clientResponse = await fetch(`${baseUrl}/api/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.access_token}`
        },
        body: JSON.stringify({
          client_data: {
            full_name: 'Devon Smart Jr',
            contact_email: 'devonsmartjr@gmail.com',
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
        })
      });
      
      console.log(`📡 Client Response: ${clientResponse.status} ${clientResponse.statusText}`);
      
      if (clientResponse.ok) {
        const clientData = await clientResponse.json();
        console.log('✅ Client created successfully:', clientData.id);
        return { baseUrl, token: authData.access_token, client: clientData };
      } else {
        const errorText = await clientResponse.text();
        console.log('❌ Client creation failed:', errorText);
      }
    } else {
      const errorText = await authResponse.text();
      console.log('❌ Authentication failed:', errorText);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
  
  return null;
}

async function runAllTests() {
  console.log('🔍 Starting GetSnug API Discovery...\n');
  
  // Test with corrected endpoint
  const result = await testWithCorrectEndpoint();
  
  if (result) {
    console.log(`\n✅ API working at: ${result.baseUrl}`);
    console.log(`✅ Client ID: ${result.client.id}`);
  } else {
    console.log('\n❌ Still having issues - need to research correct API structure');
  }
  
  await testLocalVercelAPI();
  
  console.log('\n✅ Test suite completed');
}

// Run tests
runAllTests().catch(console.error);
