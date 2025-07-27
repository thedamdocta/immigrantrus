import { WebhookEvent } from '@clerk/clerk-sdk-node';
import crypto from 'crypto';

// Snug API service for webhooks (plain JS version)
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

// Verify webhook signature
function verifyWebhook(payload, headers) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('Missing webhook secret');
  }

  const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const headerPayload = headers['svix-id'] + '.' + headers['svix-timestamp'] + '.' + payloadString;
  
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret.split('_')[1])
    .update(headerPayload)
    .digest('base64');

  const actualSignature = headers['svix-signature'].split(',')[1].split('=')[1];
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(actualSignature)
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook signature
    const isValid = verifyWebhook(req.body, req.headers);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = req.body;

    // Handle user.created event
    if (event.type === 'user.created') {
      const user = event.data;
      
      // Extract user information
      const firstName = user.first_name || '';
      const lastName = user.last_name || '';
      const email = user.email_addresses?.[0]?.email_address || '';

      if (!firstName || !lastName || !email) {
        console.error('Missing required user data:', { firstName, lastName, email });
        return res.status(400).json({ error: 'Missing required user data' });
      }

      // Create Snug client
      try {
        const snugService = new SnugApiService();
        const clientData = SnugApiService.createDefaultClientData(firstName, lastName, email);
        const result = await snugService.createClient(clientData);
        
        console.log('Snug client created successfully:', result);
        
        return res.status(200).json({ 
          success: true, 
          message: 'User processed and Snug client created',
          snugClientId: result.id 
        });
      } catch (snugError) {
        console.error('Failed to create Snug client:', snugError);
        // Don't fail the webhook - log the error but return success
        return res.status(200).json({ 
          success: true, 
          message: 'User processed, but Snug client creation failed',
          error: snugError.message 
        });
      }
    }

    // For other event types, just return success
    return res.status(200).json({ success: true, message: 'Webhook received' });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
