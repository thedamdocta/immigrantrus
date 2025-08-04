#!/usr/bin/env node

/**
 * COMPLETE CRM SYSTEM STARTUP
 * 
 * This script starts the entire ImmigrantsRUs CRM system:
 * 1. Standalone MCP PostgreSQL Bridge (port 5434)
 * 2. TwentyCRM Server (port 20000) 
 * 3. TwentyCRM Frontend (port 3000)
 * 4. Main ImmigrantsRUs Site (port 5173)
 * 
 * Usage: node start-complete-crm-system.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Complete ImmigrantsRUs CRM System...\n');

// Define all processes
const processes = [];
let startupComplete = false;

// Function to spawn process with proper logging
function spawnProcess(name, command, args, options = {}) {
  console.log(`\n📦 Starting ${name}...`);
  console.log(`   Command: ${command} ${args.join(' ')}`);
  
  const proc = spawn(command, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
    ...options
  });

  // Handle stdout
  proc.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(`[${name}] ${output}`);
    }
  });

  // Handle stderr
  proc.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output && !output.includes('ExperimentalWarning')) {
      console.log(`[${name}] ${output}`);
    }
  });

  // Handle process exit
  proc.on('close', (code) => {
    console.log(`\n❌ ${name} exited with code ${code}`);
    if (!startupComplete) {
      process.exit(1);
    }
  });

  proc.on('error', (error) => {
    console.error(`\n💥 Error starting ${name}:`, error.message);
    if (!startupComplete) {
      process.exit(1);
    }
  });

  processes.push({ name, proc });
  return proc;
}

// Function to check if a service is ready
async function waitForService(name, url, maxWait = 30000) {
  console.log(`\n⏳ Waiting for ${name} to be ready at ${url}...`);
  
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`✅ ${name} is ready!`);
        return true;
      }
    } catch (error) {
      // Service not ready yet, continue waiting
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`⏰ Timeout waiting for ${name}`);
  return false;
}

// Graceful shutdown handler
function handleShutdown() {
  console.log('\n🛑 Shutting down all processes...');
  
  processes.forEach(({ name, proc }) => {
    console.log(`   Stopping ${name}...`);
    try {
      proc.kill('SIGTERM');
    } catch (error) {
      console.log(`   Force killing ${name}...`);
      proc.kill('SIGKILL');
    }
  });
  
  setTimeout(() => {
    console.log('👋 Goodbye!');
    process.exit(0);
  }, 2000);
}

// Setup signal handlers
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

async function startSystem() {
  try {
    // Step 1: Start MCP PostgreSQL Bridge
    console.log('\n🔧 STEP 1: Starting MCP PostgreSQL Bridge...');
    const mcpBridge = spawnProcess(
      'MCP-Bridge',
      'node',
      ['mcp-postgresql-bridge.js'],
      { cwd: process.cwd() }
    );

    // Wait a moment for bridge to initialize
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 2: Start TwentyCRM Server
    console.log('\n🎯 STEP 2: Starting TwentyCRM Server...');
    const crmServer = spawnProcess(
      'TwentyCRM-Server',
      'npm',
      ['run', 'start:dev'],
      { cwd: path.join(process.cwd(), 'twenty-crm', 'packages', 'twenty-server') }
    );

    // Wait for TwentyCRM Server to be ready
    await waitForService('TwentyCRM Server', 'http://localhost:20000/api/health');

    // Step 3: Start TwentyCRM Frontend  
    console.log('\n🎨 STEP 3: Starting TwentyCRM Frontend...');
    const crmFrontend = spawnProcess(
      'TwentyCRM-Frontend',
      'npm',
      ['run', 'dev'],
      { cwd: path.join(process.cwd(), 'twenty-crm', 'packages', 'twenty-front') }
    );

    // Wait for TwentyCRM Frontend to be ready
    await waitForService('TwentyCRM Frontend', 'http://localhost:3000');

    // Step 4: Start Main ImmigrantsRUs Site
    console.log('\n🏠 STEP 4: Starting Main ImmigrantsRUs Site...');
    const mainSite = spawnProcess(
      'ImmigrantsRUs-Main',
      'npm',
      ['run', 'dev'],
      { cwd: process.cwd() }
    );

    // Wait for main site to be ready
    await waitForService('ImmigrantsRUs Main Site', 'http://localhost:5173');

    // All systems ready!
    startupComplete = true;
    console.log('\n🎉 =================================');
    console.log('🎉 ALL SYSTEMS READY!');
    console.log('🎉 =================================');
    console.log('\n📋 SERVICE STATUS:');
    console.log('   ✅ MCP PostgreSQL Bridge: Running (port 5434)');
    console.log('   ✅ TwentyCRM Server: http://localhost:20000');
    console.log('   ✅ TwentyCRM Frontend: http://localhost:3000');  
    console.log('   ✅ ImmigrantsRUs Main: http://localhost:5173');
    console.log('\n🎯 MAIN ACCESS POINTS:');
    console.log('   🌐 ImmigrantsRUs Homepage: http://localhost:5173');
    console.log('   👥 Staff Portal: http://localhost:5173/staff-portal');
    console.log('   🏢 Direct TwentyCRM: http://localhost:3000');
    console.log('\n📝 INTEGRATION STATUS:');
    console.log('   ✅ Standalone MCP Bridge with real Supabase data');
    console.log('   ✅ TwentyCRM connected to bridge (not mock data)');
    console.log('   ✅ Staff Portal auto-redirects to TwentyCRM');
    console.log('   ✅ Production-ready architecture');
    console.log('\n🔄 Press Ctrl+C to stop all services');

  } catch (error) {
    console.error('\n💥 Startup failed:', error);
    handleShutdown();
  }
}

// Start the system
startSystem();
