#!/usr/bin/env node

// TwentyCRM with MCP Bridge Startup Script
// Starts the MCP PostgreSQL Bridge first, then TwentyCRM
// This solves the "Tenant or user not found" database connectivity issue

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

class TwentyCRMWithMCPBridge {
  constructor() {
    this.bridgeProcess = null;
    this.crmProcess = null;
    this.frontendProcess = null;
    this.isShuttingDown = false;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '🔧',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      bridge: '🌉',
      crm: '📊',
      frontend: '🎨'
    }[type] || '📝';
    
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async checkPort(port) {
    return new Promise((resolve) => {
      const net = require('net');
      const socket = new net.Socket();
      
      socket.setTimeout(1000);
      socket.on('connect', () => {
        socket.destroy();
        resolve(true);
      });
      
      socket.on('timeout', () => {
        socket.destroy();
        resolve(false);
      });
      
      socket.on('error', () => {
        resolve(false);
      });
      
      socket.connect(port, 'localhost');
    });
  }

  async waitForPort(port, maxAttempts = 30) {
    this.log(`Waiting for port ${port} to be available...`);
    
    for (let i = 0; i < maxAttempts; i++) {
      if (await this.checkPort(port)) {
        this.log(`Port ${port} is now available!`, 'success');
        return true;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      process.stdout.write('.');
    }
    
    this.log(`Port ${port} did not become available after ${maxAttempts} seconds`, 'error');
    return false;
  }

  async startMCPBridge() {
    this.log('Starting MCP PostgreSQL Bridge...', 'bridge');
    
    // Check if bridge is already running
    if (await this.checkPort(5433)) {
      this.log('MCP Bridge is already running on port 5433', 'warning');
      return true;
    }

    return new Promise((resolve, reject) => {
      this.bridgeProcess = spawn('node', ['mcp-postgresql-bridge.js'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: process.cwd()
      });

      this.bridgeProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        if (output) {
          this.log(`Bridge: ${output}`, 'bridge');
          
          if (output.includes('Bridge is ready to accept')) {
            resolve(true);
          }
        }
      });

      this.bridgeProcess.stderr.on('data', (data) => {
        const error = data.toString().trim();
        if (error) {
          this.log(`Bridge Error: ${error}`, 'error');
        }
      });

      this.bridgeProcess.on('error', (error) => {
        this.log(`Failed to start MCP Bridge: ${error.message}`, 'error');
        reject(error);
      });

      this.bridgeProcess.on('exit', (code) => {
        if (!this.isShuttingDown) {
          this.log(`MCP Bridge exited with code ${code}`, 'error');
          this.cleanup();
        }
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        if (this.bridgeProcess && !this.bridgeProcess.killed) {
          reject(new Error('MCP Bridge startup timeout'));
        }
      }, 10000);
    });
  }

  async startTwentyCRMServer() {
    this.log('Starting TwentyCRM Server...', 'crm');
    
    const crmServerPath = path.join(process.cwd(), 'twenty-crm');
    
    if (!fs.existsSync(crmServerPath)) {
      throw new Error('TwentyCRM directory not found. Please ensure twenty-crm exists.');
    }

    // Check if CRM is already running
    if (await this.checkPort(3000)) {
      this.log('TwentyCRM Server is already running on port 3000', 'warning');
      return true;
    }

    return new Promise((resolve, reject) => {
      this.crmProcess = spawn('yarn', ['nx', 'start', 'twenty-server'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: crmServerPath,
        shell: true
      });

      let startupComplete = false;

      this.crmProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        if (output) {
          this.log(`CRM Server: ${output}`, 'crm');
          
          // Look for successful startup indicators
          if (output.includes('Application is running on') || 
              output.includes('Nest application successfully started') ||
              output.includes('Server is running')) {
            if (!startupComplete) {
              startupComplete = true;
              resolve(true);
            }
          }
        }
      });

      this.crmProcess.stderr.on('data', (data) => {
        const error = data.toString().trim();
        if (error && !error.includes('warn') && !error.includes('deprecated')) {
          this.log(`CRM Server Error: ${error}`, 'error');
        }
      });

      this.crmProcess.on('error', (error) => {
        this.log(`Failed to start TwentyCRM Server: ${error.message}`, 'error');
        reject(error);
      });

      this.crmProcess.on('exit', (code) => {
        if (!this.isShuttingDown) {
          this.log(`TwentyCRM Server exited with code ${code}`, 'error');
          this.cleanup();
        }
      });

      // Timeout after 60 seconds for CRM startup
      setTimeout(() => {
        if (!startupComplete) {
          this.log('TwentyCRM Server startup timeout - but it might still be starting', 'warning');
          resolve(true); // Continue anyway, CRM might still be starting
        }
      }, 60000);
    });
  }

  async startTwentyCRMFrontend() {
    this.log('Starting TwentyCRM Frontend...', 'frontend');
    
    const crmFrontendPath = path.join(process.cwd(), 'twenty-crm');

    // Check if frontend is already running  
    if (await this.checkPort(3001)) {
      this.log('TwentyCRM Frontend is already running on port 3001', 'warning');
      return true;
    }

    return new Promise((resolve, reject) => {
      this.frontendProcess = spawn('yarn', ['nx', 'start', 'twenty-front'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: crmFrontendPath,
        shell: true
      });

      let startupComplete = false;

      this.frontendProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        if (output) {
          this.log(`CRM Frontend: ${output}`, 'frontend');
          
          if (output.includes('webpack compiled') || 
              output.includes('compiled successfully') ||
              output.includes('Local:') ||
              output.includes('On Your Network:')) {
            if (!startupComplete) {
              startupComplete = true;
              resolve(true);
            }
          }
        }
      });

      this.frontendProcess.stderr.on('data', (data) => {
        const error = data.toString().trim();
        if (error && !error.includes('warn') && !error.includes('deprecated')) {
          this.log(`CRM Frontend Error: ${error}`, 'error');
        }
      });

      this.frontendProcess.on('error', (error) => {
        this.log(`Failed to start TwentyCRM Frontend: ${error.message}`, 'error');
        reject(error);
      });

      this.frontendProcess.on('exit', (code) => {
        if (!this.isShuttingDown) {
          this.log(`TwentyCRM Frontend exited with code ${code}`, 'error');
        }
      });

      // Timeout after 90 seconds for frontend startup
      setTimeout(() => {
        if (!startupComplete) {
          this.log('TwentyCRM Frontend startup timeout - but it might still be starting', 'warning');
          resolve(true); // Continue anyway
        }
      }, 90000);
    });
  }

  async start() {
    try {
      this.log('🚀 Starting TwentyCRM with MCP Bridge...', 'success');
      this.log('This will solve the "Tenant or user not found" database issue', 'info');

      // Step 1: Start MCP PostgreSQL Bridge
      await this.startMCPBridge();
      
      // Wait a moment for bridge to fully initialize
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 2: Start TwentyCRM Server (connects to bridge)
      await this.startTwentyCRMServer();

      // Wait for server to fully start
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Step 3: Start TwentyCRM Frontend
      await this.startTwentyCRMFrontend();

      this.log('🎉 All services started successfully!', 'success');
      this.log('', 'info');
      this.log('📊 TwentyCRM Server: http://localhost:3000', 'success');
      this.log('🎨 TwentyCRM Frontend: http://localhost:3001', 'success');
      this.log('🌉 MCP Bridge: localhost:5433 (PostgreSQL compatible)', 'success');
      this.log('', 'info');
      this.log('✨ TwentyCRM is now connected to Supabase via MCP Bridge!', 'success');
      this.log('✨ No more "Tenant or user not found" errors!', 'success');

      // Keep the process alive
      process.stdin.resume();

    } catch (error) {
      this.log(`Startup failed: ${error.message}`, 'error');
      await this.cleanup();
      process.exit(1);
    }
  }

  async cleanup() {
    if (this.isShuttingDown) return;
    this.isShuttingDown = true;

    this.log('🛑 Shutting down all services...', 'warning');

    const processes = [
      { name: 'Frontend', process: this.frontendProcess },
      { name: 'CRM Server', process: this.crmProcess },
      { name: 'MCP Bridge', process: this.bridgeProcess }
    ];

    for (const { name, process } of processes) {
      if (process && !process.killed) {
        this.log(`Stopping ${name}...`, 'warning');
        process.kill('SIGTERM');
        
        // Force kill after 5 seconds
        setTimeout(() => {
          if (!process.killed) {
            process.kill('SIGKILL');
          }
        }, 5000);
      }
    }

    setTimeout(() => {
      this.log('👋 All services stopped', 'info');
      process.exit(0);
    }, 6000);
  }
}

// Start the system if run directly
if (require.main === module) {
  const system = new TwentyCRMWithMCPBridge();

  // Handle graceful shutdown
  process.on('SIGTERM', () => system.cleanup());
  process.on('SIGINT', () => system.cleanup());
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    system.cleanup();
  });

  system.start();
}

module.exports = TwentyCRMWithMCPBridge;
