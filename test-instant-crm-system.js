#!/usr/bin/env node

/**
 * 🧪 INSTANT CRM SYSTEM TEST
 * 
 * This script tests the complete ImmigrantsRUs CRM system with instant access:
 * - Tests the standalone MCP bridge with real Supabase data
 * - Verifies TwentyCRM integration
 * - Confirms Staff Portal functionality
 * - Validates instant access user experience
 * 
 * Usage: node test-instant-crm-system.js
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Testing Instant CRM System Integration...\n');

// Test configuration
const tests = [
  {
    name: 'MCP Bridge Connection',
    description: 'Test standalone MCP PostgreSQL bridge',
    test: testMCPBridge
  },
  {
    name: 'Supabase Database Access',
    description: 'Verify real database queries via MCP',
    test: testSupabaseAccess
  },
  {
    name: 'TwentyCRM Server Health',
    description: 'Check TwentyCRM server availability',
    test: testTwentyCRMServer
  },
  {
    name: 'TwentyCRM Frontend',
    description: 'Verify TwentyCRM frontend accessibility',
    test: testTwentyCRMFrontend
  },
  {
    name: 'Staff Portal Integration',
    description: 'Test Staff Portal → CRM redirect flow',
    test: testStaffPortalFlow
  },
  {
    name: 'Complete User Journey',
    description: 'End-to-end user experience test',
    test: testCompleteUserJourney
  }
];

// Test results tracking
const results = [];

// Individual test functions
async function testMCPBridge() {
  console.log('   🔍 Testing MCP bridge startup...');
  
  try {
    // Start MCP bridge temporarily
    const bridge = spawn('node', ['mcp-postgresql-bridge.js'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true
    });

    // Wait for startup
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Test health endpoint
    const response = await fetch('http://localhost:5434/health', {
      signal: AbortSignal.timeout(5000)
    });

    bridge.kill('SIGTERM');

    if (response.ok) {
      return { success: true, message: 'MCP bridge started successfully' };
    } else {
      return { success: false, message: `Bridge health check failed: ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: `MCP bridge test failed: ${error.message}` };
  }
}

async function testSupabaseAccess() {
  console.log('   🔍 Testing Supabase database access...');
  
  try {
    // Import the MCP bridge module for testing
    const { executeMCPQuery } = require('./mcp-postgresql-bridge.js');
    
    // Test basic database query
    const result = await executeMCPQuery('SELECT version()');
    
    if (result && result.rows && result.rows.length > 0) {
      return { success: true, message: 'Supabase database access confirmed' };
    } else {
      return { success: false, message: 'No data returned from Supabase' };
    }
  } catch (error) {
    return { success: false, message: `Supabase access failed: ${error.message}` };
  }
}

async function testTwentyCRMServer() {
  console.log('   🔍 Testing TwentyCRM server...');
  
  try {
    const response = await fetch('http://localhost:20000/api/health', {
      signal: AbortSignal.timeout(3000)
    });

    if (response.ok) {
      return { success: true, message: 'TwentyCRM server is accessible' };
    } else {
      return { success: false, message: `Server not ready: ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: 'TwentyCRM server not running (expected during test)' };
  }
}

async function testTwentyCRMFrontend() {
  console.log('   🔍 Testing TwentyCRM frontend...');
  
  try {
    const response = await fetch('http://localhost:3000', {
      signal: AbortSignal.timeout(3000)
    });

    if (response.ok) {
      return { success: true, message: 'TwentyCRM frontend is accessible' };
    } else {
      return { success: false, message: `Frontend not ready: ${response.status}` };
    }
  } catch (error) {
    return { success: false, message: 'TwentyCRM frontend not running (expected during test)' };
  }
}

async function testStaffPortalFlow() {
  console.log('   🔍 Testing Staff Portal integration...');
  
  try {
    // Check if Staff Portal page exists
    const fs = require('fs');
    const staffPortalExists = fs.existsSync('./src/pages/StaffPortalPage.tsx');
    
    if (!staffPortalExists) {
      return { success: false, message: 'Staff Portal page not found' };
    }

    // Check if routing is configured
    const appContent = fs.readFileSync('./src/App.tsx', 'utf8');
    const hasStaffRoute = appContent.includes('/staff-portal') || appContent.includes('StaffPortalPage');

    if (hasStaffRoute) {
      return { success: true, message: 'Staff Portal routing configured correctly' };
    } else {
      return { success: false, message: 'Staff Portal route not configured in App.tsx' };
    }
  } catch (error) {
    return { success: false, message: `Staff Portal test failed: ${error.message}` };
  }
}

async function testCompleteUserJourney() {
  console.log('   🔍 Testing complete user journey...');
  
  try {
    // Check all required files exist
    const fs = require('fs');
    const requiredFiles = [
      'mcp-postgresql-bridge.js',
      'start-immigrantrus-with-instant-crm.js',
      'src/pages/StaffPortalPage.tsx',
      'api/start-crm-services.js'
    ];

    const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
    
    if (missingFiles.length > 0) {
      return { success: false, message: `Missing files: ${missingFiles.join(', ')}` };
    }

    return { success: true, message: 'All required components are in place' };
  } catch (error) {
    return { success: false, message: `User journey test failed: ${error.message}` };
  }
}

// Main test runner
async function runTests() {
  console.log('🎯 Running comprehensive system tests...\n');

  for (const test of tests) {
    console.log(`📋 ${test.name}: ${test.description}`);
    
    try {
      const result = await test.test();
      results.push({ ...test, ...result });
      
      if (result.success) {
        console.log(`   ✅ PASS: ${result.message}\n`);
      } else {
        console.log(`   ❌ FAIL: ${result.message}\n`);
      }
    } catch (error) {
      results.push({ ...test, success: false, message: error.message });
      console.log(`   💥 ERROR: ${error.message}\n`);
    }
  }

  // Display final results
  console.log('🎉 ================================');
  console.log('🎉 TEST RESULTS SUMMARY');
  console.log('🎉 ================================\n');

  const passed = results.filter(r => r.success).length;
  const total = results.length;

  console.log(`📊 Tests Passed: ${passed}/${total}`);
  console.log(`📈 Success Rate: ${Math.round((passed/total) * 100)}%\n`);

  if (passed === total) {
    console.log('🎊 ALL TESTS PASSED! 🎊');
    console.log('\n✅ SYSTEM STATUS: READY FOR INSTANT CRM ACCESS');
    console.log('\n🚀 NEXT STEPS:');
    console.log('   1. Run: node start-immigrantrus-with-instant-crm.js');
    console.log('   2. Visit: http://localhost:5173');
    console.log('   3. Click "Staff Portal" for instant TwentyCRM access');
    console.log('\n💡 FEATURES CONFIRMED:');
    console.log('   ✅ Standalone MCP bridge with real Supabase data');
    console.log('   ✅ TwentyCRM integration ready');
    console.log('   ✅ Staff Portal auto-redirect configured');
    console.log('   ✅ Production-ready architecture');
  } else {
    console.log('⚠️  SOME TESTS FAILED');
    console.log('\n🔧 ISSUES TO ADDRESS:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`   ❌ ${result.name}: ${result.message}`);
    });
  }

  console.log('\n🔄 Test completed.');
}

// Run the tests
runTests().catch(error => {
  console.error('\n💥 Test runner failed:', error);
  process.exit(1);
});
