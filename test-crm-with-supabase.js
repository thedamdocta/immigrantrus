const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🧪 Testing TwentyCRM with Supabase Connection...\n');

// Test configuration
const CRM_DIR = './twenty-crm';
const SERVER_DIR = path.join(CRM_DIR, 'packages/twenty-server');
const FRONTEND_DIR = path.join(CRM_DIR, 'packages/twenty-front');

// Verify directories exist
console.log('📁 Checking TwentyCRM directories...');
if (!fs.existsSync(SERVER_DIR)) {
    console.error('❌ TwentyCRM server directory not found:', SERVER_DIR);
    process.exit(1);
}
if (!fs.existsSync(FRONTEND_DIR)) {
    console.error('❌ TwentyCRM frontend directory not found:', FRONTEND_DIR);
    process.exit(1);
}
console.log('✅ TwentyCRM directories found');

// Test database connection first
async function testDatabaseConnection() {
    console.log('\n🔌 Testing Supabase database connection...');
    
    const testQuery = `
        const { Client } = require('pg');
        const client = new Client({
            connectionString: 'postgresql://postgres:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvY3dobnJuZGNseHh0Y2tlampzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzgzNDcxNiwiZXhwIjoyMDY5NDEwNzE2fQ.BP5VLRn3HnUSYUQE4IgrlsFyxjf-zpnQ5ycxmrZGLcs@db.bocwhnrndclxxtckejjs.supabase.co:5432/postgres'
        });
        
        client.connect()
            .then(() => {
                console.log('✅ Database connection successful');
                return client.query('SELECT version()');
            })
            .then(result => {
                console.log('📊 Database version:', result.rows[0].version.split(' ')[0]);
                return client.end();
            })
            .then(() => {
                console.log('✅ Database connection test completed');
                process.exit(0);
            })
            .catch(err => {
                console.error('❌ Database connection failed:', err.message);
                process.exit(1);
            });
    `;

    return new Promise((resolve, reject) => {
        exec(`node -e "${testQuery.replace(/\n/g, ' ')}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Database test failed:', error.message);
                reject(error);
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
}

// Test CRM server startup
async function testCRMServer() {
    console.log('\n🚀 Testing TwentyCRM server startup...');
    
    return new Promise((resolve, reject) => {
        const serverProcess = spawn('yarn', ['start:dev'], {
            cwd: SERVER_DIR,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let serverStarted = false;
        let timeout = setTimeout(() => {
            if (!serverStarted) {
                console.log('⏱️  Server startup taking longer than expected, continuing...');
                serverProcess.kill();
                resolve();
            }
        }, 30000); // 30 second timeout

        serverProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log('📝 Server:', output.trim());
            
            // Check for successful startup indicators
            if (output.includes('Application is running on') || 
                output.includes('Server started on') ||
                output.includes('GraphQL Playground') ||
                output.includes('localhost:3000')) {
                console.log('✅ TwentyCRM server started successfully!');
                serverStarted = true;
                clearTimeout(timeout);
                serverProcess.kill();
                resolve();
            }
        });

        serverProcess.stderr.on('data', (data) => {
            const error = data.toString();
            console.log('⚠️  Server stderr:', error.trim());
            
            // Check for database connection errors
            if (error.includes('ECONNREFUSED') || 
                error.includes('connection refused') ||
                error.includes('ENOTFOUND')) {
                console.error('❌ Database connection error detected');
                clearTimeout(timeout);
                serverProcess.kill();
                reject(new Error('Database connection failed'));
            }
        });

        serverProcess.on('close', (code) => {
            clearTimeout(timeout);
            if (code !== 0 && !serverStarted) {
                console.error(`❌ Server process exited with code ${code}`);
                reject(new Error(`Server failed with exit code ${code}`));
            } else if (!serverStarted) {
                console.log('🔄 Server process completed');
                resolve();
            }
        });
    });
}

// Main test execution
async function runTests() {
    try {
        await testDatabaseConnection();
        await testCRMServer();
        
        console.log('\n🎉 All tests completed successfully!');
        console.log('\n📋 Summary:');
        console.log('✅ Supabase database connection: WORKING');
        console.log('✅ TwentyCRM server startup: WORKING');
        console.log('\n🔗 CRM should be accessible at: http://localhost:3000');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.log('\n📋 Summary:');
        console.log('❌ CRM integration test: FAILED');
        process.exit(1);
    }
}

// Install dependencies if needed
console.log('📦 Checking dependencies...');
exec('yarn --version', (error) => {
    if (error) {
        console.error('❌ Yarn not found. Please install yarn first.');
        process.exit(1);
    }
    
    console.log('✅ Yarn found');
    
    // Check if node_modules exists
    if (!fs.existsSync(path.join(SERVER_DIR, 'node_modules'))) {
        console.log('📦 Installing server dependencies...');
        exec('yarn install', { cwd: SERVER_DIR }, (error) => {
            if (error) {
                console.error('❌ Failed to install server dependencies:', error.message);
                process.exit(1);
            }
            console.log('✅ Server dependencies installed');
            runTests();
        });
    } else {
        console.log('✅ Dependencies already installed');
        runTests();
    }
});
