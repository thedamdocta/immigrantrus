import { Injectable, Logger } from '@nestjs/common';

export interface PracticeArea {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
}

@Injectable()
export class PracticeAreaService {
  private readonly logger = new Logger(PracticeAreaService.name);

  // ImmigrantRus Practice Areas
  private readonly practiceAreas: PracticeArea[] = [
    {
      id: '1',
      name: 'Wills and Trust',
      slug: 'wills-trust',
      description: 'Estate planning documents including wills and trust setup',
      active: true,
    },
    {
      id: '2',
      name: 'Estate Planning',
      slug: 'estate-planning',
      description: 'Comprehensive estate planning services',
      active: true,
    },
    {
      id: '3',
      name: 'Immigration',
      slug: 'immigration',
      description: 'Immigration law services and visa assistance',
      active: true,
    },
    {
      id: '4',
      name: 'Credit Repair',
      slug: 'credit-repair',
      description: 'Credit repair and financial rehabilitation services',
      active: true,
    },
    {
      id: '5',
      name: 'Mortgages',
      slug: 'mortgages',
      description: 'Mortgage assistance and home loan services',
      active: true,
    },
    {
      id: '6',
      name: 'Personal Injury',
      slug: 'personal-injury',
      description: 'Personal injury law and compensation claims',
      active: true,
    },
    {
      id: '7',
      name: 'Real Estate',
      slug: 'real-estate',
      description: 'Real estate transactions and property law',
      active: true,
    },
  ];

  async getAllPracticeAreas(): Promise<PracticeArea[]> {
    return this.practiceAreas.filter(area => area.active);
  }

  async getPracticeAreaById(id: string): Promise<PracticeArea | null> {
    return this.practiceAreas.find(area => area.id === id && area.active) || null;
  }

  async getPracticeAreaByName(name: string): Promise<PracticeArea | null> {
    return this.practiceAreas.find(
      area => area.name.toLowerCase() === name.toLowerCase() && area.active
    ) || null;
  }

  async getPracticeAreaBySlug(slug: string): Promise<PracticeArea | null> {
    return this.practiceAreas.find(area => area.slug === slug && area.active) || null;
  }

  async validatePracticeAreas(practiceAreaNames: string[]): Promise<string[]> {
    if (!practiceAreaNames || practiceAreaNames.length === 0) {
      return [];
    }

    const validAreas: string[] = [];
    const availableAreas = await this.getAllPracticeAreas();

    for (const areaName of practiceAreaNames) {
      const area = availableAreas.find(
        a => a.name.toLowerCase() === areaName.toLowerCase()
      );

      if (area) {
        validAreas.push(area.name);
      } else {
        this.logger.warn(`Invalid practice area: ${areaName}`);
      }
    }

    return validAreas;
  }

  async getPracticeAreaTags(practiceAreaNames: string[]): Promise<string[]> {
    const validAreas = await this.validatePracticeAreas(practiceAreaNames);
    
    return validAreas.map(areaName => {
      const area = this.practiceAreas.find(
        a => a.name.toLowerCase() === areaName.toLowerCase()
      );
      return area ? area.slug : areaName.toLowerCase().replace(/\s+/g, '-');
    });
  }

  async searchPracticeAreas(query: string): Promise<PracticeArea[]> {
    if (!query || query.trim().length === 0) {
      return await this.getAllPracticeAreas();
    }

    const searchTerm = query.toLowerCase().trim();
    const availableAreas = await this.getAllPracticeAreas();

    return availableAreas.filter(area =>
      area.name.toLowerCase().includes(searchTerm) ||
      area.slug.toLowerCase().includes(searchTerm) ||
      (area.description && area.description.toLowerCase().includes(searchTerm))
    );
  }

  async addCustomPracticeArea(name: string, description?: string): Promise<PracticeArea> {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Check if it already exists
    const existing = await this.getPracticeAreaByName(name);
    if (existing) {
      throw new Error(`Practice area already exists: ${name}`);
    }

    const newArea: PracticeArea = {
      id: (this.practiceAreas.length + 1).toString(),
      name,
      slug,
      description,
      active: true,
    };

    // In a real implementation, this would be saved to the database
    this.practiceAreas.push(newArea);
    
    this.logger.log(`Added custom practice area: ${name}`);
    return newArea;
  }

  async updatePracticeArea(
    id: string,
    updates: Partial<Omit<PracticeArea, 'id'>>
  ): Promise<PracticeArea> {
    const areaIndex = this.practiceAreas.findIndex(area => area.id === id);
    
    if (areaIndex === -1) {
      throw new Error(`Practice area not found: ${id}`);
    }

    const updatedArea = {
      ...this.practiceAreas[areaIndex],
      ...updates,
    };

    // Update slug if name changed
    if (updates.name) {
      updatedArea.slug = updates.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }

    // In a real implementation, this would be saved to the database
    this.practiceAreas[areaIndex] = updatedArea;
    
    this.logger.log(`Updated practice area: ${id}`);
    return updatedArea;
  }

  async deactivatePracticeArea(id: string): Promise<boolean> {
    const areaIndex = this.practiceAreas.findIndex(area => area.id === id);
    
    if (areaIndex === -1) {
      return false;
    }

    // In a real implementation, this would be saved to the database
    this.practiceAreas[areaIndex].active = false;
    
    this.logger.log(`Deactivated practice area: ${id}`);
    return true;
  }

  async getPracticeAreaStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    areas: { name: string; slug: string; active: boolean }[];
  }> {
    const active = this.practiceAreas.filter(area => area.active);
    const inactive = this.practiceAreas.filter(area => !area.active);

    return {
      total: this.practiceAreas.length,
      active: active.length,
      inactive: inactive.length,
      areas: this.practiceAreas.map(area => ({
        name: area.name,
        slug: area.slug,
        active: area.active,
      })),
    };
  }

  // Utility method to check if practice areas feature is enabled
  isPracticeAreasEnabled(): boolean {
    return process.env.PRACTICE_AREAS_ENABLED === 'true';
  }

  // Get practice areas suitable for frontend dropdown/selection
  async getPracticeAreasForSelection(): Promise<{
    value: string;
    label: string;
    description?: string;
  }[]> {
    const areas = await this.getAllPracticeAreas();
    
    return areas.map(area => ({
      value: area.name,
      label: area.name,
      description: area.description,
    }));
  }
}
