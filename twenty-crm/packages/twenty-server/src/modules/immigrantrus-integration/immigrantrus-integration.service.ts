import { Injectable, Logger } from '@nestjs/common';
import { GetSnugService } from './getsnug.service';
import { PracticeAreaService } from './practice-area.service';

export interface ImmigrantRusContact {
  id?: string;
  email: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  practiceAreas: string[];
  tags: string[];
  notes: string;
  source: 'website' | 'referral' | 'social' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  createdAt?: Date;
  updatedAt?: Date;
  getsnugId?: string;
}

export interface CreateContactData {
  email: string;
  phone: string;
  practiceAreas: string[];
  source: string;
  notes: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

@Injectable()
export class ImmigrantrusIntegrationService {
  private readonly logger = new Logger(ImmigrantrusIntegrationService.name);

  constructor(
    private readonly getSnugService: GetSnugService,
    private readonly practiceAreaService: PracticeAreaService,
  ) {}

  async createContact(contactData: CreateContactData): Promise<{
    localContact: ImmigrantRusContact;
    getsnugContact?: any;
  }> {
    this.logger.log(`Creating contact for email: ${contactData.email}`);

    try {
      // 1. Validate practice areas
      const validPracticeAreas = await this.practiceAreaService.validatePracticeAreas(
        contactData.practiceAreas,
      );

      // 2. Prepare contact data
      const localContactData: ImmigrantRusContact = {
        id: this.generateContactId(),
        email: contactData.email,
        phone: contactData.phone,
        firstName: contactData.firstName || '',
        lastName: contactData.lastName || '',
        practiceAreas: validPracticeAreas,
        tags: this.generateTags(contactData),
        notes: contactData.notes || '',
        source: contactData.source as any,
        status: 'new',
        createdAt: new Date(),
      };

      // 3. Create in local CRM (TwentyCRM)
      const localContact = await this.createLocalContact(localContactData);

      // 4. Create in GetSnug CRM (if enabled)
      let getsnugContact = null;
      if (process.env.DUAL_CRM_SYNC_ENABLED === 'true') {
        try {
          getsnugContact = await this.getSnugService.createContact({
            email: contactData.email,
            phone: contactData.phone,
            firstName: contactData.firstName,
            lastName: contactData.lastName,
            practiceAreas: validPracticeAreas,
            source: contactData.source,
            notes: contactData.notes,
          });

          // Link the contacts
          if (getsnugContact && getsnugContact.id) {
            localContact.getsnugId = getsnugContact.id;
            await this.updateLocalContact(localContact.id!, { getsnugId: getsnugContact.id });
          }
        } catch (getsnugError) {
          this.logger.error(`Failed to create contact in GetSnug: ${getsnugError.message}`);
          // Continue with local contact creation even if GetSnug fails
        }
      }

      this.logger.log(`Contact created successfully: ${localContact.id}`);
      
      return {
        localContact,
        getsnugContact,
      };
    } catch (error) {
      this.logger.error(`Failed to create contact: ${error.message}`);
      throw error;
    }
  }

  async getContact(id: string): Promise<ImmigrantRusContact | null> {
    // In a real implementation, this would query the database
    // For now, we'll simulate it
    return this.mockGetContact(id);
  }

  async updateContact(
    id: string,
    updateData: Partial<ImmigrantRusContact>,
  ): Promise<ImmigrantRusContact> {
    this.logger.log(`Updating contact: ${id}`);

    try {
      // 1. Update local contact
      const updatedContact = await this.updateLocalContact(id, updateData);

      // 2. Sync to GetSnug if enabled and linked
      if (
        process.env.DUAL_CRM_SYNC_ENABLED === 'true' &&
        updatedContact.getsnugId
      ) {
        try {
          await this.getSnugService.updateContact(updatedContact.getsnugId, updateData);
        } catch (getsnugError) {
          this.logger.error(`Failed to sync update to GetSnug: ${getsnugError.message}`);
        }
      }

      return updatedContact;
    } catch (error) {
      this.logger.error(`Failed to update contact: ${error.message}`);
      throw error;
    }
  }

  async getAllContacts(): Promise<{
    contacts: ImmigrantRusContact[];
    total: number;
  }> {
    // In a real implementation, this would query the database
    // For now, we'll return mock data
    return {
      contacts: [],
      total: 0,
    };
  }

  async getContactsByPracticeArea(practiceArea: string): Promise<ImmigrantRusContact[]> {
    // Mock implementation
    return [];
  }

  private generateContactId(): string {
    return Date.now().toString();
  }

  private generateTags(contactData: CreateContactData): string[] {
    const tags = ['new-lead'];

    // Add practice area tags
    contactData.practiceAreas.forEach(area => {
      tags.push(area.toLowerCase().replace(/\s+/g, '-'));
    });

    // Add source tag
    tags.push(`source-${contactData.source}`);

    // Add custom tags if provided
    if (contactData.tags) {
      tags.push(...contactData.tags);
    }

    return tags;
  }

  private async createLocalContact(contactData: ImmigrantRusContact): Promise<ImmigrantRusContact> {
    // In a real implementation, this would use the TwentyCRM database
    // For now, we'll simulate it
    this.logger.log(`Creating local contact: ${contactData.email}`);
    
    // Simulate database save
    return {
      ...contactData,
      createdAt: new Date(),
    };
  }

  private async updateLocalContact(
    id: string,
    updateData: Partial<ImmigrantRusContact>,
  ): Promise<ImmigrantRusContact> {
    // In a real implementation, this would update the TwentyCRM database
    this.logger.log(`Updating local contact: ${id}`);
    
    // Simulate database update
    const existingContact = await this.mockGetContact(id);
    if (!existingContact) {
      throw new Error(`Contact not found: ${id}`);
    }

    return {
      ...existingContact,
      ...updateData,
      updatedAt: new Date(),
    };
  }

  private async mockGetContact(id: string): Promise<ImmigrantRusContact | null> {
    // Mock implementation - in real app this would query the database
    return {
      id,
      email: 'mock@example.com',
      phone: '+1234567890',
      firstName: 'Mock',
      lastName: 'Contact',
      practiceAreas: ['Immigration'],
      tags: ['new-lead', 'immigration'],
      notes: 'Mock contact for testing',
      source: 'website',
      status: 'new',
      createdAt: new Date(),
    };
  }

  // Health check method
  async getHealthStatus(): Promise<{
    status: string;
    timestamp: string;
    contacts: number;
  }> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      contacts: 0, // In real implementation, get from database
    };
  }
}
