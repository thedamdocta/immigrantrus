// Local CRM Server for ImmigrantsRUs
// This runs the CRM API on localhost for testing

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Practice Areas as defined in PRD
const PRACTICE_AREAS = [
  'Wills and Trust',
  'Estate Planning', 
  'Immigration',
  'Credit Repair',
  'Mortgages',
  'Personal Injury',
  'Real Estate'
];

console.log('🚀 Starting ImmigrantsRUs CRM Server...');
console.log('📍 Supabase URL:', supabaseUrl);
console.log('🔑 Supabase Key:', supabaseKey ? 'LOADED' : 'MISSING');

// Health check endpoint
app.get('/api/immigrantrus-crm/health', async (req, res) => {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('contacts')
      .select('count', { count: 'exact' })
      .limit(1);

    const dbStatus = error ? 'disconnected' : 'connected';
    const dbError = error ? error.message : null;

    res.json({
      status: 'healthy',
      service: 'ImmigrantsRUs CRM API',
      version: '1.0.0',
      database: dbStatus,
      database_error: dbError,
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/api/immigrantrus-crm/health',
        contacts: '/api/immigrantrus-crm/contacts',
        practice_areas: '/api/immigrantrus-crm/practice-areas'
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Get all contacts
app.get('/api/immigrantrus-crm/contacts', async (req, res) => {
  try {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create new contact
app.post('/api/immigrantrus-crm/contacts', async (req, res) => {
  try {
    const { email, phone, notes, practiceAreas } = req.body;

    // Validation
    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Email and phone are required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Validate practice areas if provided
    if (practiceAreas && Array.isArray(practiceAreas)) {
      const invalidAreas = practiceAreas.filter(area => !PRACTICE_AREAS.includes(area));
      if (invalidAreas.length > 0) {
        return res.status(400).json({
          success: false,
          error: `Invalid practice areas: ${invalidAreas.join(', ')}`,
          valid_areas: PRACTICE_AREAS
        });
      }
    }

    // Check if contact already exists
    const { data: existingContact } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', email)
      .single();

    if (existingContact) {
      return res.status(409).json({
        success: false,
        error: 'Contact with this email already exists'
      });
    }

    // Create contact
    const contactData = {
      email,
      phone,
      notes: notes || '',
      practice_areas: practiceAreas || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: newContact, error } = await supabase
      .from('contacts')
      .insert([contactData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: newContact
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get practice areas
app.get('/api/immigrantrus-crm/practice-areas', (req, res) => {
  res.json({
    success: true,
    data: PRACTICE_AREAS,
    count: PRACTICE_AREAS.length
  });
});

// Serve a simple web interface
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ImmigrantsRUs CRM - Local Test</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .method { font-weight: bold; color: #007bff; }
            button { background: #007bff; color: white; padding: 10px 15px; border: none; border-radius: 3px; cursor: pointer; margin: 5px; }
            button:hover { background: #0056b3; }
            #results { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
            pre { background: #e9ecef; padding: 10px; border-radius: 3px; overflow-x: auto; }
        </style>
    </head>
    <body>
        <h1>🏢 ImmigrantsRUs CRM - Local Test Server</h1>
        <p>Test your CRM API endpoints below:</p>
        
        <div class="endpoint">
            <h3><span class="method">GET</span> /api/immigrantrus-crm/health</h3>
            <p>Check API health and database connection</p>
            <button onclick="testHealth()">Test Health Check</button>
        </div>
        
        <div class="endpoint">
            <h3><span class="method">GET</span> /api/immigrantrus-crm/practice-areas</h3>
            <p>Get all available practice areas</p>
            <button onclick="testPracticeAreas()">Get Practice Areas</button>
        </div>
        
        <div class="endpoint">
            <h3><span class="method">GET</span> /api/immigrantrus-crm/contacts</h3>
            <p>Get all contacts</p>
            <button onclick="testGetContacts()">Get All Contacts</button>
        </div>
        
        <div class="endpoint">
            <h3><span class="method">POST</span> /api/immigrantrus-crm/contacts</h3>
            <p>Create a new contact</p>
            <button onclick="testCreateContact()">Create Test Contact</button>
        </div>
        
        <div id="results">
            <h3>📊 Results</h3>
            <pre id="output">Click a button above to test an endpoint...</pre>
        </div>

        <script>
            function showResult(data) {
                document.getElementById('output').textContent = JSON.stringify(data, null, 2);
            }
            
            async function testHealth() {
                try {
                    const response = await fetch('/api/immigrantrus-crm/health');
                    const data = await response.json();
                    showResult(data);
                } catch (error) {
                    showResult({error: error.message});
                }
            }
            
            async function testPracticeAreas() {
                try {
                    const response = await fetch('/api/immigrantrus-crm/practice-areas');
                    const data = await response.json();
                    showResult(data);
                } catch (error) {
                    showResult({error: error.message});
                }
            }
            
            async function testGetContacts() {
                try {
                    const response = await fetch('/api/immigrantrus-crm/contacts');
                    const data = await response.json();
                    showResult(data);
                } catch (error) {
                    showResult({error: error.message});
                }
            }
            
            async function testCreateContact() {
                try {
                    const testContact = {
                        email: 'test' + Date.now() + '@example.com',
                        phone: '+1-555-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
                        notes: 'Test contact created from local server',
                        practiceAreas: ['Immigration', 'Estate Planning']
                    };
                    
                    const response = await fetch('/api/immigrantrus-crm/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(testContact)
                    });
                    const data = await response.json();
                    showResult(data);
                } catch (error) {
                    showResult({error: error.message});
                }
            }
        </script>
    </body>
    </html>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎉 ImmigrantsRUs CRM Server is running!`);
  console.log(`📍 Local URL: http://localhost:${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api/immigrantrus-crm`);
  console.log(`\n📋 Available Endpoints:`);
  console.log(`   GET  /api/immigrantrus-crm/health`);
  console.log(`   GET  /api/immigrantrus-crm/contacts`);
  console.log(`   POST /api/immigrantrus-crm/contacts`);
  console.log(`   GET  /api/immigrantrus-crm/practice-areas`);
  console.log(`\n🌐 Open http://localhost:${PORT} to test the API\n`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down CRM server...');
  process.exit(0);
});
