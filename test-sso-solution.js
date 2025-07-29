#!/usr/bin/env node

/**
 * Comprehensive SSO Solution Test
 * Tests the new Google SSO flow with Clerk MCP server integration
 */

import fetch from 'node-fetch';

console.log('🧪 TESTING SSO SOLUTION - COMPREHENSIVE VERIFICATION\n');

// Test Configuration
const BASE_URL = 'http://localhost:3000';
const API_BASE = 'http://localhost:3000/api';

// Test user data
const testGoogleUser = {
  email: 'test.sso@example.com',
  firstName: 'Sarah',
  lastName: 'Johnson',
  profileImage: 'https://example.com/profile.jpg',
  googleId: 'google_test_123456789'
};

/**
 * Test 1: MCP User Creation Endpoint
 */
async function testMCPUserCreation() {
  console.log('📝 TEST 1: MCP User Creation Endpoint');
  
  try {
    const response = await fetch(`${API_BASE}/mcp-create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testGoogleUser.email,
        firstName: testGoogleUser.firstName,
        lastName: testGoogleUser.lastName,
        externalId: testGoogleUser.googleId,
        publicMetadata: {
          profileImage: testGoogleUser.profileImage,
          authProvider: 'google',
          createdVia: 'sso-test'
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ MCP User Creation: SUCCESS');
      console.log(`   - User ID: ${result.user.id}`);
      console.log(`   - Name: ${result.user.firstName} ${result.user.lastName}`);
      console.log(`   - Email: ${result.user.email}`);
      return result.user;
    } else {
      const error = await response.json();
      console.log('❌ MCP User Creation: FAILED');
      console.log(`   - Error: ${error.error}`);
      console.log(`   - Details: ${error.details}`);
      return null;
    }
  } catch (error) {
    console.log('❌ MCP User Creation: ERROR');
    console.log(`   - ${error.message}`);
    return null;
  }
}

/**
 * Test 2: MCP User Retrieval Endpoint
 */
async function testMCPUserRetrieval() {
  console.log('\n🔍 TEST 2: MCP User Retrieval Endpoint');
  
  try {
    const response = await fetch(`${API_BASE}/mcp-get-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: testGoogleUser.email
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ MCP User Retrieval: SUCCESS');
      console.log(`   - Found User: ${result.user.firstName} ${result.user.lastName}`);
      console.log(`   - Email: ${result.user.email}`);
      console.log(`   - External ID: ${result.user.externalId}`);
      return result.user;
    } else {
      const error = await response.json();
      console.log('❌ MCP User Retrieval: FAILED');
      console.log(`   - Error: ${error.error}`);
      return null;
    }
  } catch (error) {
    console.log('❌ MCP User Retrieval: ERROR');
    console.log(`   - ${error.message}`);
    return null;
  }
}

/**
 * Test 3: SSO Authentication Endpoint
 */
async function testSSOAuthentication() {
  console.log('\n🔐 TEST 3: SSO Authentication Endpoint');
  
  try {
    const response = await fetch(`${API_BASE}/sso-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        googleUser: testGoogleUser
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ SSO Authentication: SUCCESS');
      console.log(`   - User ID: ${result.user.id}`);
      console.log(`   - Name: ${result.user.firstName} ${result.user.lastName}`);
      console.log(`   - Email: ${result.user.email}`);
      console.log(`   - Auth Provider: ${result.user.authProvider}`);
      return result;
    } else {
      const error = await response.json();
      console.log('❌ SSO Authentication: FAILED');
      console.log(`   - Error: ${error.error}`);
      console.log(`   - Details: ${error.details}`);
      return null;
    }
  } catch (error) {
    console.log('❌ SSO Authentication: ERROR');
    console.log(`   - ${error.message}`);
    return null;
  }
}

/**
 * Test 4: Snug Client Creation
 */
async function testSnugClientCreation() {
  console.log('\n🏢 TEST 4: Snug Client Creation');
  
  try {
    const response = await fetch('http://localhost:3002/api/snug-client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: testGoogleUser.firstName,
        lastName: testGoogleUser.lastName,
        email: testGoogleUser.email
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Snug Client Creation: SUCCESS');
      console.log(`   - Client ID: ${result.client?.id || 'Generated'}`);
      console.log(`   - Name: ${testGoogleUser.firstName} ${testGoogleUser.lastName}`);
      console.log(`   - Email: ${testGoogleUser.email}`);
      return result;
    } else {
      const error = await response.json();
      console.log('❌ Snug Client Creation: FAILED');
      console.log(`   - Error: ${error.error || 'Unknown error'}`);
      return null;
    }
  } catch (error) {
    console.log('⚠️  Snug Client Creation: ERROR (may be expected if server not running)');
    console.log(`   - ${error.message}`);
    return null;
  }
}

/**
 * Test 5: Frontend Component Verification
 */
async function testFrontendComponents() {
  console.log('\n🎨 TEST 5: Frontend Component Files');
  
  const componentsToCheck = [
    'src/components/ui/google-sso-button.tsx',
    'src/components/ui/registration.tsx',
    'api/sso-auth.js',
    'api/mcp-create-user.js',
    'api/mcp-get-user.js'
  ];

  let allFilesExist = true;
  
  for (const file of componentsToCheck) {
    try {
      const fs = await import('fs');
      if (fs.existsSync(file)) {
        console.log(`✅ ${file}: EXISTS`);
      } else {
        console.log(`❌ ${file}: MISSING`);
        allFilesExist = false;
      }
    } catch (error) {
      console.log(`❌ ${file}: ERROR checking`);
      allFilesExist = false;
    }
  }
  
  return allFilesExist;
}

/**
 * Test 6: MCP Server Connection Test
 */
async function testMCPConnection() {
  console.log('\n🔌 TEST 6: MCP Server Connection');
  
  try {
    // This will test if we can reach our MCP endpoints
    const testUser = await testMCPUserRetrieval();
    if (testUser) {
      console.log('✅ MCP Connection: ACTIVE');
      return true;
    } else {
      console.log('⚠️  MCP Connection: ISSUE (but may work for new users)');
      return false;
    }
  } catch (error) {
    console.log('❌ MCP Connection: ERROR');
    console.log(`   - ${error.message}`);
    return false;
  }
}

/**
 * Main Test Execution
 */
async function runAllTests() {
  console.log('🚀 Starting SSO Solution Comprehensive Test...\n');
  
  const results = {
    mcpUserCreation: false,
    mcpUserRetrieval: false,
    ssoAuthentication: false,
    snugClientCreation: false,
    frontendComponents: false,
    mcpConnection: false
  };

  // Run all tests
  const createdUser = await testMCPUserCreation();
  results.mcpUserCreation = !!createdUser;

  const retrievedUser = await testMCPUserRetrieval();
  results.mcpUserRetrieval = !!retrievedUser;

  const ssoResult = await testSSOAuthentication();
  results.ssoAuthentication = !!ssoResult;

  const snugResult = await testSnugClientCreation();
  results.snugClientCreation = !!snugResult;

  results.frontendComponents = await testFrontendComponents();
  results.mcpConnection = await testMCPConnection();

  // Summary
  console.log('\n📊 TEST RESULTS SUMMARY');
  console.log('========================');
  
  const tests = [
    { name: 'MCP User Creation', result: results.mcpUserCreation },
    { name: 'MCP User Retrieval', result: results.mcpUserRetrieval },
    { name: 'SSO Authentication', result: results.ssoAuthentication },
    { name: 'Snug Client Creation', result: results.snugClientCreation },
    { name: 'Frontend Components', result: results.frontendComponents },
    { name: 'MCP Connection', result: results.mcpConnection }
  ];

  let passedTests = 0;
  tests.forEach(test => {
    const status = test.result ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${test.name}`);
    if (test.result) passedTests++;
  });

  const overallStatus = passedTests >= 4 ? '🎉 OVERALL: READY FOR TESTING' : '⚠️  OVERALL: NEEDS ATTENTION';
  console.log(`\n${overallStatus}`);
  console.log(`Passed: ${passedTests}/${tests.length} tests`);

  if (passedTests >= 4) {
    console.log('\n🚀 The SSO solution appears to be working! You can now:');
    console.log('   1. Start the dev server: npm run dev');
    console.log('   2. Navigate to http://localhost:3000');
    console.log('   3. Click "Continue with Google" to test SSO');
    console.log('   4. Verify single authentication (no double sign-in)');
  } else {
    console.log('\n🔧 Some components need attention before testing.');
  }
}

// Run the tests
runAllTests().catch(console.error);
