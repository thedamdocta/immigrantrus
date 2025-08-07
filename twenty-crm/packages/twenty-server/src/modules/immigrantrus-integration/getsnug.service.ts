import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface GetSnugContactData {
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  practiceAreas: string[];
  source: string;
  notes: string;
}

@Injectable()
export class GetSnugService {
  private readonly logger = new Logger(GetSnugService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly workspaceId: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.GETSNUG_API_URL || 'https://api.getsnug.com';
    this.apiKey = process.env.GETSNUG_API_KEY || '';
    this.workspaceId = process.env.GETSNUG_WORKSPACE_ID || '';
  }

  async createContact(contactData: GetSnugContactData): Promise<any> {
    if (!this.apiKey || !this.workspaceId) {
      this.logger.warn('GetSnug API credentials not configured');
      return null;
    }

    try {
      this.logger.log(`Creating contact in GetSnug: ${contactData.email}`);

      const payload = {
        email: contactData.email,
        phone: contactData.phone,
        firstName: contactData.firstName || '',
        lastName: contactData.lastName || '',
        customFields: {
          practiceAreas: contactData.practiceAreas,
          source: contactData.source,
          notes: contactData.notes,
        },
        tags: contactData.practiceAreas.map(area => 
          area.toLowerCase().replace(/\s+/g, '-')
        ),
      };

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseUrl}/workspaces/${this.workspaceId}/contacts`,
          payload,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );

      this.logger.log(`Contact created in GetSnug: ${response.data.id}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to create contact in GetSnug: ${error.message}`);
      throw error;
    }
  }

  async updateContact(getsnugId: string, updateData: Partial<GetSnugContactData>): Promise<any> {
    if (!this.apiKey || !this.workspaceId) {
      this.logger.warn('GetSnug API credentials not configured');
      return null;
    }

    try {
      this.logger.log(`Updating contact in GetSnug: ${getsnugId}`);

      const payload: any = {};
      
      if (updateData.email) payload.email = updateData.email;
      if (updateData.phone) payload.phone = updateData.phone;
      if (updateData.firstName) payload.firstName = updateData.firstName;
      if (updateData.lastName) payload.lastName = updateData.lastName;
      
      if (updateData.practiceAreas || updateData.source || updateData.notes) {
        payload.customFields = {};
        if (updateData.practiceAreas) payload.customFields.practiceAreas = updateData.practiceAreas;
        if (updateData.source) payload.customFields.source = updateData.source;
        if (updateData.notes) payload.customFields.notes = updateData.notes;
      }

      if (updateData.practiceAreas) {
        payload.tags = updateData.practiceAreas.map(area => 
          area.toLowerCase().replace(/\s+/g, '-')
        );
      }

      const response = await firstValueFrom(
        this.httpService.put(
          `${this.baseUrl}/workspaces/${this.workspaceId}/contacts/${getsnugId}`,
          payload,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );

      this.logger.log(`Contact updated in GetSnug: ${getsnugId}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to update contact in GetSnug: ${error.message}`);
      throw error;
    }
  }

  async getContact(getsnugId: string): Promise<any> {
    if (!this.apiKey || !this.workspaceId) {
      this.logger.warn('GetSnug API credentials not configured');
      return null;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/workspaces/${this.workspaceId}/contacts/${getsnugId}`,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
            },
          }
        )
      );

      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get contact from GetSnug: ${error.message}`);
      throw error;
    }
  }

  async deleteContact(getsnugId: string): Promise<boolean> {
    if (!this.apiKey || !this.workspaceId) {
      this.logger.warn('GetSnug API credentials not configured');
      return false;
    }

    try {
      await firstValueFrom(
        this.httpService.delete(
          `${this.baseUrl}/workspaces/${this.workspaceId}/contacts/${getsnugId}`,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
            },
          }
        )
      );

      this.logger.log(`Contact deleted from GetSnug: ${getsnugId}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete contact from GetSnug: ${error.message}`);
      return false;
    }
  }

  async healthCheck(): Promise<boolean> {
    if (!this.apiKey || !this.workspaceId) {
      return false;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/workspaces/${this.workspaceId}/health`,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
            },
          }
        )
      );

      return response.status === 200;
    } catch (error) {
      this.logger.error(`GetSnug health check failed: ${error.message}`);
      return false;
    }
  }
}
