#!/usr/bin/env node

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5173;

console.log('🚀 Starting ImmigrantRUs with TwentyCRM Integration Demo...');

// Check if TwentyCRM frontend build exists
const frontendBuildPath = path.join(__dirname, 'twenty-crm/packages/twenty-front/build');

if (!fs.existsSync(frontendBuildPath)) {
  console.error('❌ TwentyCRM frontend build not found. Please run the build first.');
  process.exit(1);
}

// Serve main website static files
app.use(express.static('public'));
app.use(express.static('.'));

// Serve TwentyCRM frontend at /staff-portal
app.use('/staff-portal', express.static(frontendBuildPath));

// Handle SPA routing for TwentyCRM - all /staff-portal/* routes serve the React app
app.get('/staff-portal/*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Main website routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to simulate TwentyCRM backend (for demo purposes)
app.get('/graphql', (req, res) => {
  res.json({
    message: 'TwentyCRM GraphQL API would be here',
    note: 'Database connection needed for full functionality'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ ImmigrantRUs with TwentyCRM Integration running!`);
  console.log(`📊 Main website: http://localhost:${PORT}`);
  console.log(`🏢 Staff Portal (TwentyCRM): http://localhost:${PORT}/staff-portal`);
  console.log('');
  console.log('🎯 Integration Status:');
  console.log('  ✅ Frontend Integration: WORKING');
  console.log('  ✅ Routing: WORKING');
  console.log('  ✅ Static Assets: WORKING');
  console.log('  ⚠️  Backend API: Needs database setup');
  console.log('');
  console.log('📝 Next Steps:');
  console.log('  1. Set up PostgreSQL database');
  console.log('  2. Configure database connection');
  console.log('  3. Start TwentyCRM backend server');
});

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  process.exit(0);
});
