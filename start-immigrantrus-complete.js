#!/usr/bin/env node

/**
 * ImmigrantsRUs Complete Startup Script
 * Starts both the main website (Vite) and TwentyCRM with MCP Bridge
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 [ImmigrantsRUs] Starting Complete Application Stack...');
console.log('📋 This will start:');
console.log('   ✅ Main Website (Vite) on http://localhost:5173');
console.log('   ✅ TwentyCRM Backend on http://localhost:3000');
console.log('   ✅ MCP PostgreSQL Bridge on localhost:5433');
console.log('   ✅ TwentyCRM Frontend at http://localhost:5173/staff-portal');

// Start the MCP Bridge + TwentyCRM Backend
console.log('\n🌉 Starting TwentyCRM with MCP Bridge...');
const crmProcess = spawn('node', ['start-twentycrm-with-mcp-bridge.js'], {
  stdio: 'pipe',
  cwd: process.cwd(),
  env: process.env
});

crmProcess.stdout.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  lines.forEach(line => {
    if (line.trim()) {
      console.log(`📊 [CRM] ${line}`);
    }
  });
});

crmProcess.stderr.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  lines.forEach(line => {
    if (line.trim()) {
      console.log(`⚠️ [CRM] ${line}`);
    }
  });
});

// Start the main website (Vite)
console.log('🌐 Starting Main Website (Vite)...');
const viteProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'pipe',
  cwd: process.cwd(),
  env: process.env
});

viteProcess.stdout.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  lines.forEach(line => {
    if (line.trim()) {
      console.log(`🌐 [SITE] ${line}`);
    }
  });
});

viteProcess.stderr.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  lines.forEach(line => {
    if (line.trim()) {
      console.log(`⚠️ [SITE] ${line}`);
    }
  });
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all services...');
  crmProcess.kill();
  viteProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down all services...');
  crmProcess.kill();
  viteProcess.kill();
  process.exit(0);
});

crmProcess.on('close', (code) => {
  console.log(`📊 [CRM] Process exited with code ${code}`);
});

viteProcess.on('close', (code) => {
  console.log(`🌐 [SITE] Process exited with code ${code}`);
});

console.log('\n✅ All services are starting up...');
console.log('🌐 Main Website: http://localhost:5173');
console.log('📊 Staff Portal: http://localhost:5173/staff-portal');
console.log('🔧 TwentyCRM API: http://localhost:3000');
console.log('\n🔍 Use Ctrl+C to stop all services');
