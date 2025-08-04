#!/usr/bin/env node

/**
 * STANDALONE TWENTYCRM LAUNCHER
 * 
 * This script creates a truly standalone TwentyCRM system that:
 * 1. Runs entirely in Docker containers (no external dependencies)
 * 2. Includes PostgreSQL, Redis, and all services
 * 3. Starts with a single command
 * 4. Works like a desktop application, not a cloud service
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Standalone TwentyCRM System...\n');

// Configuration
const DOCKER_DIR = path.join(__dirname, 'twenty-crm', 'packages', 'twenty-docker');
const ENV_FILE = path.join(DOCKER_DIR, '.env');
const COMPOSE_FILE = path.join(DOCKER_DIR, 'docker-compose.yml');

// Check if Docker is installed
function checkDockerInstallation() {
    return new Promise((resolve, reject) => {
        exec('docker --version', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Docker is not installed or not running.');
                console.log('\n📋 To install Docker:');
                console.log('   macOS: Download Docker Desktop from https://docker.com/products/docker-desktop');
                console.log('   Windows: Download Docker Desktop from https://docker.com/products/docker-desktop');
                console.log('   Linux: sudo apt-get install docker.io docker-compose');
                reject(error);
            } else {
                console.log('✅ Docker found:', stdout.trim());
                resolve();
            }
        });
    });
}

// Check if Docker Compose is available
function checkDockerCompose() {
    return new Promise((resolve, reject) => {
        exec('docker compose version', (error, stdout, stderr) => {
            if (error) {
                // Try legacy docker-compose
                exec('docker-compose --version', (error2, stdout2, stderr2) => {
                    if (error2) {
                        console.error('❌ Docker Compose is not available.');
                        reject(error2);
                    } else {
                        console.log('✅ Docker Compose found:', stdout2.trim());
                        resolve('docker-compose');
                    }
                });
            } else {
                console.log('✅ Docker Compose found:', stdout.trim());
                resolve('docker compose');
            }
        });
    });
}

// Create environment file for standalone operation
function createStandaloneEnv() {
    const envContent = `# STANDALONE TWENTYCRM CONFIGURATION
# Generated automatically for standalone operation

TAG=latest

# Database Configuration (containerized)
PG_DATABASE_USER=postgres
PG_DATABASE_PASSWORD=twentycrm_standalone_2024
PG_DATABASE_HOST=db
PG_DATABASE_PORT=5432

# Redis Configuration (containerized)
REDIS_URL=redis://redis:6379

# Server Configuration
SERVER_URL=http://localhost:3000

# Security
APP_SECRET=${generateRandomSecret()}

# Storage (local for standalone)
STORAGE_TYPE=local

# Disable external services for standalone operation
DISABLE_DB_MIGRATIONS=false
DISABLE_CRON_JOBS_REGISTRATION=false
`;

    fs.writeFileSync(ENV_FILE, envContent);
    console.log('✅ Created standalone environment configuration');
}

// Generate a random secret
function generateRandomSecret() {
    return require('crypto').randomBytes(32).toString('base64');
}

// Start the Docker containers
function startContainers(composeCommand) {
    return new Promise((resolve, reject) => {
        console.log('🐳 Starting TwentyCRM containers...');
        console.log('   This may take a few minutes on first run (downloading images)...\n');

        const args = composeCommand.split(' ').concat(['-f', COMPOSE_FILE, 'up', '-d']);
        const dockerProcess = spawn(args[0], args.slice(1), {
            cwd: DOCKER_DIR,
            stdio: 'inherit'
        });

        dockerProcess.on('close', (code) => {
            if (code === 0) {
                console.log('\n✅ TwentyCRM containers started successfully!');
                resolve();
            } else {
                console.error(`\n❌ Docker containers failed to start (exit code: ${code})`);
                reject(new Error(`Docker process exited with code ${code}`));
            }
        });

        dockerProcess.on('error', (error) => {
            console.error('\n❌ Failed to start Docker containers:', error.message);
            reject(error);
        });
    });
}

// Wait for services to be ready
function waitForServices() {
    return new Promise((resolve) => {
        console.log('⏳ Waiting for services to be ready...');
        
        let attempts = 0;
        const maxAttempts = 60; // 5 minutes
        
        const checkHealth = () => {
            attempts++;
            exec('curl -s http://localhost:3000/healthz', (error, stdout, stderr) => {
                if (!error && stdout) {
                    console.log('✅ TwentyCRM is ready!');
                    resolve();
                } else if (attempts < maxAttempts) {
                    process.stdout.write('.');
                    setTimeout(checkHealth, 5000);
                } else {
                    console.log('\n⚠️  Services may still be starting. Check http://localhost:3000');
                    resolve();
                }
            });
        };
        
        setTimeout(checkHealth, 10000); // Wait 10 seconds before first check
    });
}

// Display success information
function displaySuccessInfo() {
    console.log('\n🎉 ================================');
    console.log('🎉 STANDALONE TWENTYCRM IS READY!');
    console.log('🎉 ================================\n');
    
    console.log('📋 ACCESS INFORMATION:');
    console.log('   🌐 TwentyCRM URL: http://localhost:3000');
    console.log('   📊 Database: PostgreSQL (containerized)');
    console.log('   🔄 Cache: Redis (containerized)');
    console.log('   💾 Storage: Local filesystem\n');
    
    console.log('🔧 MANAGEMENT COMMANDS:');
    console.log('   Stop:    docker compose -f twenty-crm/packages/twenty-docker/docker-compose.yml down');
    console.log('   Restart: docker compose -f twenty-crm/packages/twenty-docker/docker-compose.yml restart');
    console.log('   Logs:    docker compose -f twenty-crm/packages/twenty-docker/docker-compose.yml logs -f\n');
    
    console.log('💡 STANDALONE BENEFITS:');
    console.log('   ✅ No external dependencies required');
    console.log('   ✅ All services containerized');
    console.log('   ✅ Data persisted in Docker volumes');
    console.log('   ✅ Production-ready configuration');
    console.log('   ✅ Works offline after initial setup\n');
    
    console.log('🔗 Integration with ImmigrantsRUs:');
    console.log('   The Staff Portal will now redirect to: http://localhost:3000');
    console.log('   TwentyCRM is running as a true standalone application!\n');
}

// Handle cleanup on exit
function setupCleanupHandlers() {
    const cleanup = () => {
        console.log('\n🛑 Shutting down TwentyCRM containers...');
        exec(`docker compose -f ${COMPOSE_FILE} down`, (error) => {
            if (error) {
                console.error('Error stopping containers:', error.message);
            } else {
                console.log('✅ TwentyCRM containers stopped');
            }
            process.exit(0);
        });
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
}

// Main execution
async function main() {
    try {
        // Check prerequisites
        await checkDockerInstallation();
        const composeCommand = await checkDockerCompose();
        
        // Setup standalone configuration
        createStandaloneEnv();
        
        // Start containers
        await startContainers(composeCommand);
        
        // Wait for services
        await waitForServices();
        
        // Display success info
        displaySuccessInfo();
        
        // Setup cleanup handlers
        setupCleanupHandlers();
        
        // Keep the process running
        console.log('🔄 TwentyCRM is running. Press Ctrl+C to stop.\n');
        
        // Keep alive
        setInterval(() => {
            // Health check every 30 seconds
            exec('curl -s http://localhost:3000/healthz', (error) => {
                if (error) {
                    console.log('⚠️  TwentyCRM may be restarting...');
                }
            });
        }, 30000);
        
    } catch (error) {
        console.error('\n❌ Failed to start Standalone TwentyCRM:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   1. Ensure Docker Desktop is running');
        console.log('   2. Check if port 3000 is available');
        console.log('   3. Try: docker system prune (to clean up)');
        process.exit(1);
    }
}

// Run the main function
main();
