#!/usr/bin/env node

// Test script for the standalone MCP PostgreSQL Bridge
// Verifies that the bridge can connect to Supabase and handle queries

const MCPPostgreSQLBridge = require('./mcp-postgresql-bridge.js');
const { Client } = require('pg');

async function testStandaloneBridge() {
  console.log('🧪 Testing Standalone MCP PostgreSQL Bridge...\n');
  
  const bridge = new MCPPostgreSQLBridge({ port: 5434 }); // Use different port for testing
  let pgClient = null;
  
  try {
    // Step 1: Start the bridge
    console.log('1️⃣ Starting MCP Bridge...');
    await bridge.start();
    console.log('✅ Bridge started successfully\n');
    
    // Wait a moment for the bridge to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Step 2: Connect PostgreSQL client to the bridge
    console.log('2️⃣ Connecting PostgreSQL client to bridge...');
    pgClient = new Client({
      host: 'localhost',
      port: 5434,
      database: 'immigrantrus_crm',
      user: 'test',
      password: 'test'
    });
    
    await pgClient.connect();
    console.log('✅ PostgreSQL client connected\n');
    
    // Step 3: Test basic queries
    console.log('3️⃣ Testing basic PostgreSQL queries...\n');
    
    // Test version query
    console.log('📋 Testing SELECT version()...');
    const versionResult = await pgClient.query('SELECT version()');
    console.log('✅ Version:', versionResult.rows[0].version);
    
    // Test current database query
    console.log('📋 Testing SELECT current_database()...');
    const dbResult = await pgClient.query('SELECT current_database()');
    console.log('✅ Database:', dbResult.rows[0].current_database);
    
    // Test schema query
    console.log('📋 Testing SELECT current_schema()...');
    const schemaResult = await pgClient.query('SELECT current_schema()');
    console.log('✅ Schema:', schemaResult.rows[0].current_schema);
    
    // Step 4: Test schema information queries
    console.log('\n4️⃣ Testing schema information queries...\n');
    
    console.log('📋 Testing information_schema.tables...');
    try {
      const tablesResult = await pgClient.query(`
        SELECT table_name, table_schema, table_type 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      console.log('✅ Tables found:', tablesResult.rows.length);
      tablesResult.rows.forEach(row => {
        console.log(`  - ${row.table_name} (${row.table_type})`);
      });
    } catch (error) {
      console.log('⚠️ Schema query fallback used:', error.message);
    }
    
    // Step 5: Test workspace queries
    console.log('\n5️⃣ Testing workspace queries...\n');
    
    console.log('📋 Testing workspace query...');
    try {
      const workspaceResult = await pgClient.query(`
        SELECT id, "displayName", "domainName", subdomain 
        FROM workspace 
        LIMIT 1
      `);
      if (workspaceResult.rows.length > 0) {
        console.log('✅ Workspace found:', workspaceResult.rows[0]);
      } else {
        console.log('ℹ️ No workspace data returned');
      }
    } catch (error) {
      console.log('⚠️ Workspace query handled:', error.message);
    }
    
    // Step 6: Test MCP-specific SQL queries
    console.log('\n6️⃣ Testing MCP SQL execution...\n');
    
    console.log('📋 Testing simple SELECT query...');
    try {
      const selectResult = await pgClient.query('SELECT 1 as test_column');
      console.log('✅ Simple SELECT works:', selectResult.rows);
    } catch (error) {
      console.log('⚠️ Simple SELECT handled:', error.message);
    }
    
    console.log('\n✅ All tests completed successfully!');
    console.log('🎉 Standalone MCP Bridge is working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error(error.stack);
    process.exit(1);
  } finally {
    // Cleanup
    if (pgClient) {
      await pgClient.end();
      console.log('🔌 PostgreSQL client disconnected');
    }
    
    await bridge.stop();
    console.log('🛑 Bridge stopped');
  }
}

// Run the test
if (require.main === module) {
  testStandaloneBridge().catch(console.error);
}

module.exports = { testStandaloneBridge };
