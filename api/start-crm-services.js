/**
 * API ENDPOINT: Start CRM Services
 * 
 * This endpoint allows the Staff Portal to programmatically start
 * the CRM services when they're not running.
 * 
 * POST /api/start-crm-services
 */

const { spawn } = require('child_process');
const path = require('path');

let isStarting = false;
let startupProcess = null;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  // Prevent multiple startup attempts
  if (isStarting) {
    return res.status(409).json({
      error: 'Startup in progress',
      message: 'CRM services are already being started. Please wait...',
      status: 'starting'
    });
  }

  try {
    console.log('🚀 API: Starting CRM services via API request...');
    isStarting = true;

    // Check if services are already running
    const isAlreadyRunning = await checkServices();
    if (isAlreadyRunning) {
      isStarting = false;
      return res.status(200).json({
        success: true,
        message: 'CRM services are already running',
        status: 'running',
        services: {
          bridge: 'http://localhost:5434',
          crm_server: 'http://localhost:20000',
          crm_frontend: 'http://localhost:3000'
        }
      });
    }

    // Start the complete CRM system
    console.log('📦 Spawning complete CRM system startup...');
    
    startupProcess = spawn('node', ['start-complete-crm-system.js'], {
      cwd: process.cwd(),
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    // Handle startup process output
    startupProcess.stdout.on('data', (data) => {
      console.log(`[CRM-Startup] ${data.toString().trim()}`);
    });

    startupProcess.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output && !output.includes('ExperimentalWarning')) {
        console.log(`[CRM-Startup] ${output}`);
      }
    });

    // Handle startup completion/failure
    startupProcess.on('close', (code) => {
      console.log(`[CRM-Startup] Process exited with code ${code}`);
      isStarting = false;
      startupProcess = null;
    });

    startupProcess.on('error', (error) => {
      console.error('[CRM-Startup] Error:', error);
      isStarting = false;
      startupProcess = null;
    });

    // Don't wait for startup to complete, return immediately
    res.status(202).json({
      success: true,
      message: 'CRM services startup initiated',
      status: 'starting',
      estimated_time: '30-60 seconds',
      check_urls: {
        bridge: 'http://localhost:5434/health',
        crm_server: 'http://localhost:20000/api/health', 
        crm_frontend: 'http://localhost:3000'
      },
      instructions: 'Please wait 30-60 seconds, then refresh the Staff Portal page.'
    });

    // Reset the starting flag after a delay
    setTimeout(() => {
      isStarting = false;
    }, 60000); // 1 minute timeout

  } catch (error) {
    console.error('💥 Error starting CRM services:', error);
    isStarting = false;
    
    res.status(500).json({
      error: 'Startup failed',
      message: error.message,
      status: 'error'
    });
  }
}

// Helper function to check if services are running
async function checkServices() {
  const services = [
    'http://localhost:3000',      // TwentyCRM Frontend
    'http://localhost:20000/api/health', // TwentyCRM Server  
    'http://localhost:5434/health'       // MCP Bridge
  ];

  try {
    const checks = await Promise.allSettled(
      services.map(async (url) => {
        const response = await fetch(url, { 
          signal: AbortSignal.timeout(2000) 
        });
        return response.ok;
      })
    );

    // Return true if at least the main TwentyCRM frontend is running
    return checks[0].status === 'fulfilled' && checks[0].value === true;
    
  } catch (error) {
    return false;
  }
}

// Export for testing
export { checkServices };
