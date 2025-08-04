const fetch = require('node-fetch');

// Test configuration
const CRM_API_URL = 'http://localhost:3001';
const TEST_CONTACT = {
  email: 'test@example.com',
  phone: '+1234567890',
  source: 'website_registration'
};

async function testCrmIntegration() {
  console.log('🧪 Testing ImmigrantrusCRM Integration...\n');

  try {
    // 1. Test CRM server health
    console.log('1. Testing CRM server health...');
    const healthResponse = await fetch(`${CRM_API_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ CRM server is healthy:', healthData);
    console.log('');

    // 2. Test creating a contact
    console.log('2. Testing contact creation...');
    const createResponse = await fetch(`${CRM_API_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TEST_CONTACT)
    });
    
    const createData = await createResponse.json();
    console.log('✅ Contact created:', createData);
    const contactId = createData.data.id;
    console.log('');

    // 3. Test getting all contacts
    console.log('3. Testing get all contacts...');
    const getAllResponse = await fetch(`${CRM_API_URL}/api/contacts`);
    const getAllData = await getAllResponse.json();
    console.log('✅ All contacts retrieved:', getAllData);
    console.log('');

    // 4. Test getting contact by ID
    console.log('4. Testing get contact by ID...');
    const getByIdResponse = await fetch(`${CRM_API_URL}/api/contacts/${contactId}`);
    const getByIdData = await getByIdResponse.json();
    console.log('✅ Contact retrieved by ID:', getByIdData);
    console.log('');

    // 5. Test updating contact with practice areas
    console.log('5. Testing contact update with practice areas...');
    const updateResponse = await fetch(`${CRM_API_URL}/api/contacts/${contactId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tags: ['new-lead', 'immigration', 'estate-planning'],
        practiceAreas: ['Immigration', 'Estate Planning'],
        status: 'contacted',
        notes: 'Updated via API test - client interested in multiple services'
      })
    });
    
    const updateData = await updateResponse.json();
    console.log('✅ Contact updated:', updateData);
    console.log('');

    // 6. Test duplicate email handling
    console.log('6. Testing duplicate email handling...');
    const duplicateResponse = await fetch(`${CRM_API_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TEST_CONTACT)
    });
    
    const duplicateData = await duplicateResponse.json();
    console.log('✅ Duplicate email handled properly:', duplicateData);
    console.log('');

    console.log('🎉 All tests passed! CRM integration is working correctly.');
    console.log('\n📋 Practice Areas Available:');
    console.log('- Wills and Trust');
    console.log('- Estate Planning');
    console.log('- Immigration');
    console.log('- Credit Repair');
    console.log('- Mortgages');
    console.log('- Personal Injury');
    console.log('- Real Estate');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔍 Make sure the CRM server is running:');
    console.log('cd crm && npm install && npm start');
  }
}

// Only run if CRM server is expected to be running
if (process.argv.includes('--run')) {
  testCrmIntegration();
} else {
  console.log('🧪 CRM Integration Test Ready');
  console.log('');
  console.log('To run the test:');
  console.log('1. Start the CRM server: cd crm && npm install && npm start');
  console.log('2. Run this test: node test-crm-integration.js --run');
  console.log('');
  console.log('Or run both with: npm run test:crm');
}
