import express from 'express';
import crypto from 'crypto';

const app = express();

// Middleware to parse raw JSON for webhook verification
app.use('/api/clerk-webhook', express.raw({ type: 'application/json' }));
app.use(express.json()); // For other endpoints

// Snug API service for webhooks
class SnugApiService {
  constructor() {
    this.baseUrl = process.env.SNUG_BASE_URL || 'https://api.getsnug.com';
    this.email = process.env.SNUG_EMAIL;
    this.password = process.env.SNUG_PASSWORD;
    this.accessToken = null;
  }

  async authenticate() {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email,
        password: this.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
  }

  async createClient(clientData) {
    if (!this.accessToken) {
      await this.authenticate();
    }

    const response = await fetch(`${this.baseUrl}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create client: ${response.statusText}`);
    }

    return response.json();
  }

  static createDefaultClientData(firstName, lastName, email) {
    return {
      client_data: {
        full_name: `${firstName} ${lastName}`,
        contact_email: email,
        estate_plan_foundation: "will",
        value_of_assets: "up_to_five",
        household_state_code: "NY",
        show_household_onboarding_requirement: false,
        blended_family: false,
        children: "none"
      },
      client_role: {
        recommendation_trust: false,
        recommendation_will: true,
        recommendation_fpoa: false,
        recommendation_hcd: false,
        professional_pricing_option: "DEFAULT",
        block_will: false,
        block_trust: false
      }
    };
  }
}

// Verify webhook signature (simplified for testing)
function verifyWebhook(payload, headers) {
  // For testing, we'll skip signature verification
  // In production, implement proper Clerk webhook signature verification
  console.log('📝 Webhook received, skipping signature verification for testing');
  return true;
}

// Simple in-memory store for user data
const userDataStore = new Map();

// GET endpoint to check user status
app.get('/api/clerk-webhook', (req, res) => {
  const { userId, email } = req.query;
  
  console.log(`🔍 GET request for user data: userId=${userId}, email=${email}`);
  console.log(`📊 Store has ${userDataStore.size} entries`);
  
  if (!userId && !email) {
    return res.status(400).json({ error: 'Missing userId or email parameter' });
  }
  
  const key = userId || email;
  const userData = userDataStore.get(key);
  
  if (!userData) {
    console.log(`📭 No data found for key: ${key}`);
    return res.status(404).json({ 
      success: false, 
      message: 'User data not found',
      hasSnugClient: false
    });
  }
  
  console.log(`✅ Found user data for ${key}:`, userData);
  
  return res.status(200).json({
    success: true,
    userData,
    hasSnugClient: userData.snugClientId ? true : false,
    snugClientId: userData.snugClientId
  });
});

// POST endpoint for webhook
app.post('/api/clerk-webhook', async (req, res) => {
  console.log('🎯 Webhook POST received');
  
  try {
    // Parse the raw body as JSON
    const event = JSON.parse(req.body.toString());
    
    console.log('📨 Webhook event type:', event.type);
    console.log('📨 Event data keys:', Object.keys(event.data || {}));

    // Handle user.created event
    if (event.type === 'user.created') {
      const user = event.data;
      
      console.log('👤 Processing user.created event for:', user.id);
      
      // Extract user information
      const firstName = user.first_name || '';
      const lastName = user.last_name || '';
      const email = user.email_addresses?.[0]?.email_address || '';

      console.log(`📝 Extracted user data: ${firstName} ${lastName} (${email})`);

      if (!firstName || !lastName || !email) {
        console.error('❌ Missing required user data:', { firstName, lastName, email });
        return res.status(400).json({ error: 'Missing required user data' });
      }

      // Store user data for later retrieval
      const userData = {
        userId: user.id,
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
        source: 'clerk_webhook'
      };

      // Store by both userId and email for flexible lookups
      userDataStore.set(user.id, userData);
      userDataStore.set(email, userData);

      console.log('✅ Stored user data:', userData);

      // Create Snug client
      try {
        console.log('🚀 Creating GetSnug client...');
        const snugService = new SnugApiService();
        const clientData = SnugApiService.createDefaultClientData(firstName, lastName, email);
        const result = await snugService.createClient(clientData);
        
        console.log('✅ Snug client created successfully:', result);
        
        // Update stored data with Snug client ID
        userData.snugClientId = result.id;
        userData.snugClientCreated = true;
        userData.snugResult = result;
        
        userDataStore.set(user.id, userData);
        userDataStore.set(email, userData);
        
        return res.status(200).json({ 
          success: true, 
          message: 'User processed and Snug client created',
          snugClientId: result.id,
          userData
        });
      } catch (snugError) {
        console.error('❌ Failed to create Snug client:', snugError.message);
        
        // Update stored data with error info
        userData.snugClientCreated = false;
        userData.snugError = snugError.message;
        
        userDataStore.set(user.id, userData);
        userDataStore.set(email, userData);
        
        // Don't fail the webhook - log the error but return success
        return res.status(200).json({ 
          success: true, 
          message: 'User processed, but Snug client creation failed',
          error: snugError.message,
          userData
        });
      }
    }

    // For other event types, just return success
    console.log('ℹ️ Non-user.created event, returning success');
    return res.status(200).json({ success: true, message: 'Webhook received' });

  } catch (error) {
    console.error('❌ Webhook error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Test endpoint to simulate webhook
app.post('/api/test-webhook', async (req, res) => {
  console.log('🧪 Test webhook endpoint called');
  
  const { firstName, lastName, email } = req.body;
  
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Simulate Clerk user.created event
  const testEvent = {
    type: 'user.created',
    data: {
      id: `test_user_${Date.now()}`,
      first_name: firstName,
      last_name: lastName,
      email_addresses: [{ email_address: email }]
    }
  };
  
  // Process the simulated event
  req.body = Buffer.from(JSON.stringify(testEvent));
  
  // Call the webhook handler
  return app._router.handle({ ...req, method: 'POST', url: '/api/clerk-webhook' }, res);
});

const PORT = process.env.WEBHOOK_PORT || 3003;

app.listen(PORT, () => {
  console.log(`🎯 Clerk Webhook Server running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/api/clerk-webhook`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test-webhook`);
  console.log(`🔍 User lookup: http://localhost:${PORT}/api/clerk-webhook?userId=xxx&email=xxx`);
});
