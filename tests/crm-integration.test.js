const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Test configuration
const config = {
  websiteUrl: 'http://localhost:5173',
  crmUrl: 'http://localhost:3000',
  crmFrontendUrl: 'http://localhost:3001',
  staffPortalUrl: 'http://localhost:5173/staff-portal',
  mcpBridgeUrl: 'http://localhost:5433'
};

class CRMIntegrationTest {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  async runTest(testName, testFn) {
    console.log(`🧪 Running: ${testName}`);
    try {
      await testFn();
      this.results.passed++;
      this.results.tests.push({ name: testName, status: 'PASSED' });
      console.log(`✅ PASSED: ${testName}`);
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ 
        name: testName, 
        status: 'FAILED', 
        error: error.message 
      });
      console.log(`❌ FAILED: ${testName} - ${error.message}`);
    }
  }

  async testWebsiteConnectivity() {
    const response = await axios.get(config.websiteUrl, { timeout: 5000 });
    if (response.status !== 200) {
      throw new Error(`Website returned status ${response.status}`);
    }
  }

  async testCRMServerConnectivity() {
    try {
      // Test CRM Backend Server
      const response = await axios.get(`${config.crmUrl}/health`, { timeout: 10000 });
      if (response.status !== 200) {
        throw new Error(`CRM server returned status ${response.status}`);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('CRM Server not yet ready - still building');
      }
      throw error;
    }
  }

  async testCRMFrontendConnectivity() {
    try {
      // Test CRM Frontend
      const response = await axios.get(config.crmFrontendUrl, { timeout: 5000 });
      if (response.status !== 200) {
        throw new Error(`CRM frontend returned status ${response.status}`);
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('CRM Frontend not accessible');
      }
      throw error;
    }
  }

  async testStaffPortalAssets() {
    const indexPath = path.join(__dirname, '../public/staff-portal/index.html');
    if (!fs.existsSync(indexPath)) {
      throw new Error('Staff portal index.html not found');
    }

    const assetsPath = path.join(__dirname, '../public/staff-portal/assets');
    if (!fs.existsSync(assetsPath)) {
      throw new Error('Staff portal assets directory not found');
    }

    const assetFiles = fs.readdirSync(assetsPath);
    if (assetFiles.length === 0) {
      throw new Error('No assets found in staff portal directory');
    }
  }

  async testStaffPortalAccess() {
    const response = await axios.get(config.staffPortalUrl, { timeout: 5000 });
    if (response.status !== 200) {
      throw new Error(`Staff portal returned status ${response.status}`);
    }

    // Check if response contains TwentyCRM content
    if (!response.data.includes('<!doctype html>')) {
      throw new Error('Staff portal did not return valid HTML');
    }
  }

  async testMCPBridgeConnectivity() {
    try {
      // Test if MCP bridge process is running
      const { exec } = require('child_process');
      return new Promise((resolve, reject) => {
        exec('ps aux | grep mcp-postgresql-bridge | grep -v grep', (error, stdout) => {
          if (error || !stdout.trim()) {
            reject(new Error('MCP PostgreSQL Bridge process not running'));
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      throw new Error(`MCP Bridge connectivity failed: ${error.message}`);
    }
  }

  async testAssetPathConfiguration() {
    const indexPath = path.join(__dirname, '../public/staff-portal/index.html');
    const content = fs.readFileSync(indexPath, 'utf8');

    // Check if asset paths are correctly prefixed with /staff-portal/
    if (!content.includes('href="/staff-portal/assets/')) {
      throw new Error('Asset paths not correctly configured for /staff-portal/');
    }

    if (!content.includes('src="/staff-portal/assets/')) {
      throw new Error('Script paths not correctly configured for /staff-portal/');
    }
  }

  async testUnifiedStartupScript() {
    const scriptPath = path.join(__dirname, '../start-immigrantrus-complete.js');
    if (!fs.existsSync(scriptPath)) {
      throw new Error('Unified startup script not found');
    }

    // Check if all required processes are mentioned in the script
    const content = fs.readFileSync(scriptPath, 'utf8');
    const requiredProcesses = [
      'mcp-postgresql-bridge',
      'twenty-server',
      'twenty-front'
    ];

    for (const process of requiredProcesses) {
      if (!content.includes(process)) {
        throw new Error(`Unified startup script missing ${process} process`);
      }
    }
  }

  async testFileStructure() {
    const requiredFiles = [
      'mcp-postgresql-bridge.js',
      'start-immigrantrus-complete.js',
      'copy-crm-assets.js',
      'public/staff-portal/index.html',
      'public/staff-portal/manifest.json'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(__dirname, '..', file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Required file not found: ${file}`);
      }
    }
  }

  async runAllTests() {
    console.log('🚀 Starting CRM Integration Tests...\n');

    // Phase 1: File Structure
    await this.runTest('File Structure Verification', () => this.testFileStructure());
    
    // Phase 2: Asset Configuration
    await this.runTest('Asset Path Configuration', () => this.testAssetPathConfiguration());
    await this.runTest('Staff Portal Assets', () => this.testStaffPortalAssets());
    
    // Phase 3: Connectivity Tests
    await this.runTest('Website Connectivity', () => this.testWebsiteConnectivity());
    await this.runTest('MCP Bridge Connectivity', () => this.testMCPBridgeConnectivity());
    await this.runTest('Staff Portal Access', () => this.testStaffPortalAccess());
    
    // Phase 4: Process Management
    await this.runTest('Unified Startup Script', () => this.testUnifiedStartupScript());
    
    // Phase 5: CRM Services
    await this.runTest('CRM Server Connectivity', () => this.testCRMServerConnectivity());
    await this.runTest('CRM Frontend Connectivity', () => this.testCRMFrontendConnectivity());

    this.printResults();
  }

  printResults() {
    console.log('\n📊 Test Results Summary:');
    console.log('═'.repeat(50));
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📈 Total:  ${this.results.tests.length}`);
    console.log('═'.repeat(50));

    if (this.results.failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.tests
        .filter(test => test.status === 'FAILED')
        .forEach(test => {
          console.log(`   • ${test.name}: ${test.error}`);
        });
    }

    if (this.results.failed === 0) {
      console.log('\n🎉 All integration tests passed!');
      console.log('✅ Phase 5: Testing & Quality Assurance - COMPLETE');
    } else {
      console.log('\n⚠️  Some tests failed. Please review and fix issues.');
    }
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const tester = new CRMIntegrationTest();
  tester.runAllTests().catch(console.error);
}

module.exports = CRMIntegrationTest;
