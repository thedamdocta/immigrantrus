#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting ImmigrantsRUs with integrated TwentyCRM...\n');
console.log('� Using SQLite for ultra-reliable database - zero connection failures!\n');

// Check if twenty-crm directory exists
const twentyCrmPath = path.join(__dirname, 'twenty-crm');
if (!fs.existsSync(twentyCrmPath)) {
  console.error('❌ twenty-crm directory not found!');
  console.log('Please ensure the TwentyCRM is properly set up in the twenty-crm directory.');
  process.exit(1);
}

// Function to spawn a process with proper output handling
function spawnProcess(command, args, cwd, name, color) {
  console.log(`${color}[${name}]${'\x1b[0m'} Starting: ${command} ${args.join(' ')}`);
  
  const child = spawn(command, args, {
    cwd: cwd,
    stdio: 'pipe',
    shell: true
  });

  // Handle stdout
  child.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(`${color}[${name}]${'\x1b[0m'} ${output}`);
    }
  });

  // Handle stderr
  child.stderr.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(`${color}[${name}]${'\x1b[0m'} ${output}`);
    }
  });

  // Handle process exit
  child.on('close', (code) => {
    if (code !== 0) {
      console.log(`${color}[${name}]${'\x1b[0m'} Process exited with code ${code}`);
    }
  });

  return child;
}

// Start TwentyCRM server (port 3000)
console.log('\n📊 Starting TwentyCRM Backend...');
const crmServerProcess = spawnProcess(
  'yarn',
  ['nx', 'start', 'twenty-server'],
  twentyCrmPath,
  'CRM-SERVER',
  '\x1b[34m' // Blue
);

// Start TwentyCRM frontend (port 3001) 
console.log('\n🎨 Starting TwentyCRM Frontend...');
const crmFrontendProcess = spawnProcess(
  'yarn',
  ['nx', 'start', 'twenty-front'],
  twentyCrmPath,
  'CRM-FRONTEND', 
  '\x1b[35m' // Magenta
);

// Wait a bit for CRM to start, then start main website
setTimeout(() => {
  console.log('\n🌐 Starting Main Website...');
  const mainSiteProcess = spawnProcess(
    'npm',
    ['run', 'dev'],
    __dirname,
    'MAIN-SITE',
    '\x1b[32m' // Green
  );
}, 5000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down all processes...');
  
  if (crmServerProcess) {
    crmServerProcess.kill('SIGTERM');
  }
  if (crmFrontendProcess) {
    crmFrontendProcess.kill('SIGTERM');
  }
  
  setTimeout(() => {
    process.exit(0);
  }, 2000);
});

console.log('\n✨ All services starting...');
console.log('📍 Main Website: http://localhost:5173');
console.log('📍 Staff Portal (via proxy): http://localhost:5173/staff-portal');
console.log('📍 TwentyCRM Direct: http://localhost:3000');
console.log('\n⌨️  Press Ctrl+C to stop all services\n');
