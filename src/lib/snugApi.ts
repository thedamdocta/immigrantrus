// Snug API service for creating clients
export interface SnugClientData {
  client_data: {
    full_name: string;
    contact_email: string;
    estate_plan_foundation: string;
    value_of_assets: string;
    household_state_code: string;
    show_household_onboarding_requirement: boolean;
    blended_family: boolean;
    children: string;
  };
  client_role: {
    recommendation_trust: boolean;
    recommendation_will: boolean;
    recommendation_fpoa: boolean;
    recommendation_hcd: boolean;
    professional_pricing_option: string;
    block_will: boolean;
    block_trust: boolean;
  };
}

export class SnugApiService {
  private baseUrl: string;
  private email: string;
  private password: string;
  private accessToken: string | null = null;

  constructor() {
    this.baseUrl = import.meta.env.VITE_SNUG_BASE_URL || 'https://api.getsnug.com';
    this.email = import.meta.env.VITE_SNUG_EMAIL || '';
    this.password = import.meta.env.VITE_SNUG_PASSWORD || '';
  }

  // Authenticate with Snug API
  async authenticate(): Promise<void> {
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

  // Create a new client in Snug
  async createClient(clientData: SnugClientData): Promise<any> {
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

  // Create default client data from user info
  static createDefaultClientData(firstName: string, lastName: string, email: string): SnugClientData {
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
