const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

console.log('🌉 Starting MCP Database Bridge...');
console.log('This bridge will proxy database requests from TwentyCRM to MCP');

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        message: 'MCP Database Bridge is running',
        timestamp: new Date().toISOString()
    });
});

// Execute SQL via MCP
app.post('/execute-sql', async (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: 'SQL query is required' });
    }

    console.log('📝 Executing SQL via MCP:', query.substring(0, 100) + '...');

    try {
        // Use MCP to execute SQL
        const mcpCommand = `echo '${JSON.stringify({
            method: 'execute_sql',
            params: { query }
        })}' | cline-mcp execute github.com/supabase-community/supabase-mcp execute_sql`;

        exec(mcpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ MCP execution failed:', error.message);
                return res.status(500).json({ 
                    error: 'Database query failed', 
                    details: error.message 
                });
            }

            try {
                const result = JSON.parse(stdout);
                console.log('✅ SQL executed successfully');
                res.json(result);
            } catch (parseError) {
                console.log('📄 Raw result:', stdout);
                res.json({ result: stdout });
            }
        });

    } catch (error) {
        console.error('❌ Bridge error:', error.message);
        res.status(500).json({ 
            error: 'Bridge error', 
            details: error.message 
        });
    }
});

// List tables via MCP
app.get('/tables', async (req, res) => {
    console.log('📋 Fetching tables via MCP...');

    try {
        const mcpCommand = `echo '${JSON.stringify({
            method: 'list_tables',
            params: { schemas: ['public'] }
        })}' | cline-mcp execute github.com/supabase-community/supabase-mcp list_tables`;

        exec(mcpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ MCP execution failed:', error.message);
                return res.status(500).json({ 
                    error: 'Failed to list tables', 
                    details: error.message 
                });
            }

            try {
                const result = JSON.parse(stdout);
                console.log('✅ Tables listed successfully');
                res.json(result);
            } catch (parseError) {
                console.log('📄 Raw result:', stdout);
                res.json({ result: stdout });
            }
        });

    } catch (error) {
        console.error('❌ Bridge error:', error.message);
        res.status(500).json({ 
            error: 'Bridge error', 
            details: error.message 
        });
    }
});

// Apply migration via MCP
app.post('/migrate', async (req, res) => {
    const { name, query } = req.body;
    
    if (!name || !query) {
        return res.status(400).json({ error: 'Migration name and query are required' });
    }

    console.log('🔧 Applying migration via MCP:', name);

    try {
        const mcpCommand = `echo '${JSON.stringify({
            method: 'apply_migration',
            params: { name, query }
        })}' | cline-mcp execute github.com/supabase-community/supabase-mcp apply_migration`;

        exec(mcpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ MCP migration failed:', error.message);
                return res.status(500).json({ 
                    error: 'Migration failed', 
                    details: error.message 
                });
            }

            try {
                const result = JSON.parse(stdout);
                console.log('✅ Migration applied successfully');
                res.json(result);
            } catch (parseError) {
                console.log('📄 Raw result:', stdout);
                res.json({ result: stdout });
            }
        });

    } catch (error) {
        console.error('❌ Bridge error:', error.message);
        res.status(500).json({ 
            error: 'Bridge error', 
            details: error.message 
        });
    }
});

const PORT = 5432; // Use PostgreSQL port to intercept connections
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`🎯 MCP Database Bridge running on ${HOST}:${PORT}`);
    console.log(`📊 Database proxy: http://${HOST}:${PORT}`);
    console.log(`🔍 Health check: http://${HOST}:${PORT}/health`);
    console.log(`📋 Tables endpoint: http://${HOST}:${PORT}/tables`);
    console.log(`💾 SQL endpoint: http://${HOST}:${PORT}/execute-sql`);
    console.log(`🔧 Migration endpoint: http://${HOST}:${PORT}/migrate`);
    console.log('\n✨ Bridge is ready to proxy TwentyCRM database requests to MCP!');
});

module.exports = app;
