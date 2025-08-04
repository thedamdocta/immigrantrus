#!/usr/bin/env node

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5173;
const TWENTY_SERVER_PORT = 3000;
const TWENTY_FRONTEND_PORT = 3001;

console.log('🚀 Starting Production TwentyCRM System...');

// Check if builds exist
const frontendBuildPath = path.join(__dirname, 'twenty-crm/packages/twenty-front/build');
const serverBuildPath = path.join(__dirname, 'twenty-crm/packages/twenty-server/dist');

if (!fs.existsSync(frontendBuildPath)) {
  console.error('❌ Frontend build not found. Please run the build first.');
  process.exit(1);
}

if (!fs.existsSync(serverBuildPath)) {
  console.error('❌ Server build not found. Please run the build first.');
  process.exit(1);
}

// Start TwentyCRM Server (Backend API)
console.log('🔧 Starting TwentyCRM Server...');
const serverProcess = spawn('node', ['dist/src/main.js'], {
  cwd: path.join(__dirname, 'twenty-crm/packages/twenty-server'),
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: TWENTY_SERVER_PORT,
    NODE_ENV: 'production',
    // Add database connection here
    PG_DATABASE_URL: process.env.SUPABASE_DATABASE_URL || 'postgresql://localhost:5432/twenty',
  }
});

// Serve main website
app.use(express.static('public'));
app.use(express.static('.'));

// Serve TwentyCRM frontend at /staff-portal
app.use('/staff-portal', express.static(frontendBuildPath));

// Handle SPA routing for TwentyCRM
app.get('/staff-portal/*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Main website routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Proxy API requests to TwentyCRM server
app.use('/graphql', (req, res) => {
  const url = `http://localhost:${TWENTY_SERVER_PORT}${req.url}`;
  const proxyReq = require('http').request(url, (response) => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res);
  });
  req.pipe(proxyReq);
});

// Start the main server
app.listen(PORT, () => {
  console.log(`✅ Production system running at http://localhost:${PORT}`);
  console.log(`📊 Main website: http://localhost:${PORT}`);
  console.log(`🏢 Staff Portal: http://localhost:${PORT}/staff-portal`);
  console.log(`🔌 TwentyCRM API: http://localhost:${TWENTY_SERVER_PORT}`);
});

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  serverProcess.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  serverProcess.kill();
  process.exit(0);
});
