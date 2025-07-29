// Snug API service for creating clients
export interface SnugClientData {
  client_data: {
    full_name: string;
    contact_email: string;
  };
  client_role: {
    will_price?: number;
    trust_price?: number;
  };
  spouse_data?: {
    full_name?: string;
    contact_email?: string;
  };
}

export interface SnugUserProfile {
  ud_id: string;
  pro_group_id: string;
  role: string;
}

export class SnugApiService {
  private authBaseUrl: string;
  private apiBaseUrl: string;
  private email: string;
  private password: string;
  private accessToken: string | null = null;
  private userProfile: SnugUserProfile | null = null;

  constructor() {
    this.authBaseUrl = 'https://auth.getsnug.com';
    this.apiBaseUrl = 'https://api.getsnug.com';
    this.email = import.meta.env.VITE_SNUG_EMAIL || '';
    this.password = import.meta.env.VITE_SNUG_PASSWORD || '';
  }

  // Step 1: Authenticate with Snug API to get JWT token
  async authenticate(): Promise<void> {
    const response = await fetch(`${this.authBaseUrl}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.email,
        password: this.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }

    const data = await response.json();
    this.accessToken = data.access;
  }

  // Step 2: Get user profile and professional group information
  async getUserProfile(): Promise<SnugUserProfile> {
    if (!this.accessToken) {
      await this.authenticate();
    }

    const response = await fetch(`${this.apiBaseUrl}/api/v3/user-data/?expand=professional_group_role`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.statusText}`);
    }

    const profileData = await response.json();
    this.userProfile = {
      ud_id: profileData.data.ud_id,
      pro_group_id: profileData.data.professional_group_role_user_data.professional_group_id,
      role: profileData.data.professional_group_role_user_data.role
    };

    return this.userProfile;
  }

  // Step 3: Create a new client in Snug using Pro People Roles endpoint
  // ⚠️ TEMPORARY IMPLEMENTATION - Expected to change in 1-2 weeks
  // See docs/snug-api-temporary-implementation.md for details
  async createClient(clientData: SnugClientData): Promise<any> {
    if (!this.accessToken) {
      await this.authenticate();
    }

    if (!this.userProfile) {
      await this.getUserProfile();
    }

    const response = await fetch(`${this.apiBaseUrl}/api/v3/${this.userProfile!.ud_id}/pro-group/${this.userProfile!.pro_group_id}/pro-people-roles/`, {
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

  // Create default client data from user info (simplified structure)
  static createDefaultClientData(firstName: string, lastName: string, email: string): SnugClientData {
    return {
      client_data: {
        full_name: `${firstName} ${lastName}`,
        contact_email: email
      },
      client_role: {
        // Optional pricing - leave empty to use defaults
      }
    };
  }
}
