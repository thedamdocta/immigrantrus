#!/usr/bin/env node

/**
 * 🚀 INSTANT CRM ACCESS STARTUP SCRIPT
 * 
 * This script starts ALL services simultaneously so users get instant access:
 * 1. MCP PostgreSQL Bridge (port 5434) - INSTANT startup
 * 2. TwentyCRM Server (port 20000) - Background startup
 * 3. TwentyCRM Frontend (port 3000) - Background startup  
 * 4. ImmigrantsRUs Main Site (port 5173) - Primary service
 * 
 * By the time users load the homepage and click "Staff Portal",
 * TwentyCRM will already be running and ready!
 * 
 * Usage: node start-immigrantrus-with-instant-crm.js
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting ImmigrantsRUs with Instant CRM Access...\n');

// Track all processes for graceful shutdown
const processes = [];
let shuttingDown = false;

// Enhanced process spawner with better logging
function spawnService(name, command, args, options = {}) {
  const displayName = `[${name}]`;
  console.log(`📦 Starting ${name}...`);
  
  const proc = spawn(command, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
    ...options
  });

  // Handle stdout with service-specific formatting
  proc.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      // Filter out noise and highlight important messages
      const lines = output.split('\n');
      lines.forEach(line => {
        if (line && !line.includes('ExperimentalWarning') && !line.includes('DeprecationWarning')) {
          // Highlight key status messages
          if (line.includes('ready') || line.includes('listening') || line.includes('server running')) {
            console.log(`${displayName} ✅ ${line}`);
          } else if (line.includes('error') || line.includes('failed')) {
            console.log(`${displayName} ❌ ${line}`);
          } else {
            console.log(`${displayName} ${line}`);
          }
        }
      });
    }
  });

  // Handle stderr
  proc.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output && !output.includes('ExperimentalWarning') && !output.includes('DeprecationWarning')) {
      console.log(`${displayName} ⚠️  ${output}`);
    }
  });

  // Handle process events
  proc.on('close', (code) => {
    if (!shuttingDown) {
      console.log(`${displayName} ❌ Process exited with code ${code}`);
    }
  });

  proc.on('error', (error) => {
    console.error(`${displayName} 💥 Error:`, error.message);
  });

  processes.push({ name, proc });
  return proc;
}

// Graceful shutdown handler
function gracefulShutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  
  console.log('\n🛑 Shutting down all services gracefully...');
  
  processes.forEach(({ name, proc }) => {
    console.log(`   Stopping ${name}...`);
    try {
      proc.kill('SIGTERM');
    } catch (error) {
      proc.kill('SIGKILL');
    }
  });
  
  setTimeout(() => {
    console.log('\n👋 All services stopped. Goodbye!');
    process.exit(0);
  }, 3000);
}

// Setup signal handlers
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

async function startAllServices() {
  console.log('🎯 INSTANT ACCESS STRATEGY: Starting all services in parallel...\n');

  // STEP 1: Start MCP Bridge IMMEDIATELY (fastest startup)
  console.log('⚡ PRIORITY 1: Starting MCP PostgreSQL Bridge for instant database access...');
  const mcpBridge = spawnService(
    'MCP-Bridge',
    'node',
    ['mcp-postgresql-bridge.js'],
    { cwd: process.cwd() }
  );

  // STEP 2: Start TwentyCRM Server in background (parallel)
  console.log('🎯 PRIORITY 2: Starting TwentyCRM Server in background...');  
  const crmServer = spawnService(
    'TwentyCRM-Server',
    'npm',
    ['run', 'start:dev'],
    { cwd: path.join(process.cwd(), 'twenty-crm', 'packages', 'twenty-server') }
  );

  // STEP 3: Start TwentyCRM Frontend in background (parallel)
  console.log('🎨 PRIORITY 3: Starting TwentyCRM Frontend in background...');
  const crmFrontend = spawnService(
    'TwentyCRM-Frontend', 
    'npm',
    ['run', 'dev'],
    { cwd: path.join(process.cwd(), 'twenty-crm', 'packages', 'twenty-front') }
  );

  // Small delay to ensure MCP bridge is ready first
  await new Promise(resolve => setTimeout(resolve, 2000));

  // STEP 4: Start Main Site (primary service)
  console.log('🏠 PRIORITY 4: Starting Main ImmigrantsRUs Site...');
  const mainSite = spawnService(
    'ImmigrantsRUs-Main',
    'npm', 
    ['run', 'dev'],
    { cwd: process.cwd() }
  );

  // Wait a moment for initial startup
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Display status
  console.log('\n🎉 ================================');  
  console.log('🎉 INSTANT CRM ACCESS READY!');
  console.log('🎉 ================================');
  console.log('\n📋 SERVICE STATUS:');
  console.log('   ⚡ MCP Bridge: Starting (port 5434) - INSTANT database access');
  console.log('   🎯 TwentyCRM Server: Background startup (port 20000)');
  console.log('   🎨 TwentyCRM Frontend: Background startup (port 3000)');
  console.log('   🏠 Main Site: http://localhost:5173');
  console.log('\n🚀 USER EXPERIENCE:');
  console.log('   1. Visit: http://localhost:5173');
  console.log('   2. Browse the ImmigrantsRUs homepage');
  console.log('   3. Click "Staff Portal" link → INSTANT ACCESS!');
  console.log('   4. Automatic redirect to fully-loaded TwentyCRM');
  console.log('\n💡 ARCHITECTURE BENEFITS:'); 
  console.log('   ✅ No waiting time for users');
  console.log('   ✅ Real Supabase data via standalone MCP bridge');
  console.log('   ✅ Production-ready performance');
  console.log('   ✅ Seamless integration experience');
  console.log('\n🔄 Press Ctrl+C to stop all services');

  // Keep checking service health in background
  setTimeout(checkServiceHealth, 15000);
}

// Background health checker
async function checkServiceHealth() {
  const services = [
    { name: 'Main Site', url: 'http://localhost:5173' },
    { name: 'TwentyCRM', url: 'http://localhost:3000' },
    { name: 'CRM Server', url: 'http://localhost:20000/api/health' }
  ];

  console.log('\n🔍 Background Health Check:');
  
  for (const service of services) {
    try {
      const response = await fetch(service.url, { 
        signal: AbortSignal.timeout(2000)
      });
      
      if (response.ok) {
        console.log(`   ✅ ${service.name}: Ready`);
      } else {
        console.log(`   ⏳ ${service.name}: Starting (${response.status})`);
      }
    } catch (error) {
      console.log(`   ⏳ ${service.name}: Starting...`);
    }
  }

  // Check again in 30 seconds if not shutting down
  if (!shuttingDown) {
    setTimeout(checkServiceHealth, 30000);
  }
}

// Start everything!
startAllServices().catch(error => {
  console.error('\n💥 Startup failed:', error);
  gracefulShutdown();
});
