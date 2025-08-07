import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ImmigrantrusIntegrationService, CreateContactData } from './immigrantrus-integration.service';
import { PracticeAreaService } from './practice-area.service';
import { GetSnugService } from './getsnug.service';

@Controller('api/immigrantrus')
export class ImmigrantrusIntegrationController {
  private readonly logger = new Logger(ImmigrantrusIntegrationController.name);

  constructor(
    private readonly integrationService: ImmigrantrusIntegrationService,
    private readonly practiceAreaService: PracticeAreaService,
    private readonly getSnugService: GetSnugService,
  ) {}

  // Health check endpoint
  @Get('health')
  async healthCheck() {
    try {
      const status = await this.integrationService.getHealthStatus();
      return status;
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`);
      throw new HttpException(
        'Service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  // Contact management endpoints
  @Post('contacts')
  async createContact(@Body() contactData: CreateContactData) {
    try {
      this.logger.log(`Creating contact: ${contactData.email}`);
      
      const result = await this.integrationService.createContact(contactData);
      
      return {
        success: true,
        message: 'Contact created successfully',
        data: result.localContact,
        getsnugSync: !!result.getsnugContact,
      };
    } catch (error) {
      this.logger.error(`Failed to create contact: ${error.message}`);
      
      if (error.message.includes('already exists')) {
        throw new HttpException(
          'Contact with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
      
      throw new HttpException(
        'Failed to create contact',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('contacts')
  async getAllContacts(@Query('practiceArea') practiceArea?: string) {
    try {
      if (practiceArea) {
        const contacts = await this.integrationService.getContactsByPracticeArea(practiceArea);
        return {
          success: true,
          data: contacts,
          total: contacts.length,
        };
      }

      const result = await this.integrationService.getAllContacts();
      return {
        success: true,
        data: result.contacts,
        total: result.total,
      };
    } catch (error) {
      this.logger.error(`Failed to get contacts: ${error.message}`);
      throw new HttpException(
        'Failed to retrieve contacts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('contacts/:id')
  async getContact(@Param('id') id: string) {
    try {
      const contact = await this.integrationService.getContact(id);
      
      if (!contact) {
        throw new HttpException(
          'Contact not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        data: contact,
      };
    } catch (error) {
      this.logger.error(`Failed to get contact: ${error.message}`);
      
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      
      throw new HttpException(
        'Failed to retrieve contact',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('contacts/:id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateData: any,
  ) {
    try {
      const updatedContact = await this.integrationService.updateContact(id, updateData);
      
      return {
        success: true,
        message: 'Contact updated successfully',
        data: updatedContact,
      };
    } catch (error) {
      this.logger.error(`Failed to update contact: ${error.message}`);
      
      if (error.message.includes('not found')) {
        throw new HttpException(
          'Contact not found',
          HttpStatus.NOT_FOUND,
        );
      }
      
      throw new HttpException(
        'Failed to update contact',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Practice area management endpoints
  @Get('practice-areas')
  async getPracticeAreas(@Query('search') search?: string) {
    try {
      let areas;
      
      if (search) {
        areas = await this.practiceAreaService.searchPracticeAreas(search);
      } else {
        areas = await this.practiceAreaService.getAllPracticeAreas();
      }

      return {
        success: true,
        data: areas,
        total: areas.length,
      };
    } catch (error) {
      this.logger.error(`Failed to get practice areas: ${error.message}`);
      throw new HttpException(
        'Failed to retrieve practice areas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('practice-areas/selection')
  async getPracticeAreasForSelection() {
    try {
      const areas = await this.practiceAreaService.getPracticeAreasForSelection();
      
      return {
        success: true,
        data: areas,
      };
    } catch (error) {
      this.logger.error(`Failed to get practice areas for selection: ${error.message}`);
      throw new HttpException(
        'Failed to retrieve practice areas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('practice-areas/stats')
  async getPracticeAreaStats() {
    try {
      const stats = await this.practiceAreaService.getPracticeAreaStats();
      
      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      this.logger.error(`Failed to get practice area stats: ${error.message}`);
      throw new HttpException(
        'Failed to retrieve practice area statistics',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('practice-areas')
  async createPracticeArea(
    @Body() practiceAreaData: { name: string; description?: string },
  ) {
    try {
      const newArea = await this.practiceAreaService.addCustomPracticeArea(
        practiceAreaData.name,
        practiceAreaData.description,
      );
      
      return {
        success: true,
        message: 'Practice area created successfully',
        data: newArea,
      };
    } catch (error) {
      this.logger.error(`Failed to create practice area: ${error.message}`);
      
      if (error.message.includes('already exists')) {
        throw new HttpException(
          'Practice area already exists',
          HttpStatus.CONFLICT,
        );
      }
      
      throw new HttpException(
        'Failed to create practice area',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Webhook endpoint for website integration
  @Post('webhook/contact')
  async webhookCreateContact(@Body() contactData: CreateContactData) {
    try {
      this.logger.log(`Webhook contact creation: ${contactData.email}`);
      
      // Add webhook-specific tags
      const enhancedContactData = {
        ...contactData,
        source: contactData.source || 'website_registration',
        tags: ['webhook', ...(contactData.tags || [])],
      };

      const result = await this.integrationService.createContact(enhancedContactData);
      
      return {
        success: true,
        message: 'Contact created successfully via webhook',
        data: result.localContact,
        getsnugSync: !!result.getsnugContact,
      };
    } catch (error) {
      this.logger.error(`Webhook contact creation failed: ${error.message}`);
      
      // For webhooks, we want to be more forgiving
      if (error.message.includes('already exists')) {
        return {
          success: false,
          message: 'Contact with this email already exists',
          error: 'CONTACT_EXISTS',
        };
      }
      
      throw new HttpException(
        'Failed to create contact via webhook',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GetSnug integration endpoints
  @Get('getsnug/health')
  async getSnugHealthCheck() {
    try {
      const isHealthy = await this.getSnugService.healthCheck();
      
      return {
        success: true,
        healthy: isHealthy,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error(`GetSnug health check failed: ${error.message}`);
      
      return {
        success: false,
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('sync/getsnug/:contactId')
  async syncContactToGetSnug(@Param('contactId') contactId: string) {
    try {
      const contact = await this.integrationService.getContact(contactId);
      
      if (!contact) {
        throw new HttpException(
          'Contact not found',
          HttpStatus.NOT_FOUND,
        );
      }

      if (contact.getsnugId) {
        throw new HttpException(
          'Contact already synced to GetSnug',
          HttpStatus.CONFLICT,
        );
      }

      const getsnugContact = await this.getSnugService.createContact({
        email: contact.email,
        phone: contact.phone,
        firstName: contact.firstName,
        lastName: contact.lastName,
        practiceAreas: contact.practiceAreas,
        source: contact.source,
        notes: contact.notes,
      });

      // Update local contact with GetSnug ID
      if (getsnugContact && getsnugContact.id) {
        await this.integrationService.updateContact(contactId, {
          getsnugId: getsnugContact.id,
        });
      }

      return {
        success: true,
        message: 'Contact synced to GetSnug successfully',
        data: {
          localContactId: contactId,
          getsnugContactId: getsnugContact?.id,
        },
      };
    } catch (error) {
      this.logger.error(`Failed to sync contact to GetSnug: ${error.message}`);
      
      if (error.status) {
        throw error;
      }
      
      throw new HttpException(
        'Failed to sync contact to GetSnug',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Reporting endpoints
  @Get('reports/contacts/by-practice-area')
  async getContactsByPracticeAreaReport() {
    try {
      const allContacts = await this.integrationService.getAllContacts();
      const practiceAreaStats: { [key: string]: number } = {};

      allContacts.contacts.forEach(contact => {
        contact.practiceAreas.forEach(area => {
          practiceAreaStats[area] = (practiceAreaStats[area] || 0) + 1;
        });
      });

      return {
        success: true,
        data: practiceAreaStats,
        totalContacts: allContacts.total,
      };
    } catch (error) {
      this.logger.error(`Failed to generate practice area report: ${error.message}`);
      throw new HttpException(
        'Failed to generate report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('reports/contacts/by-source')
  async getContactsBySourceReport() {
    try {
      const allContacts = await this.integrationService.getAllContacts();
      const sourceStats: { [key: string]: number } = {};

      allContacts.contacts.forEach(contact => {
        sourceStats[contact.source] = (sourceStats[contact.source] || 0) + 1;
      });

      return {
        success: true,
        data: sourceStats,
        totalContacts: allContacts.total,
      };
    } catch (error) {
      this.logger.error(`Failed to generate source report: ${error.message}`);
      throw new HttpException(
        'Failed to generate report',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
