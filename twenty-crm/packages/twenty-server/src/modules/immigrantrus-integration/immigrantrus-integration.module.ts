import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ImmigrantrusIntegrationService } from './immigrantrus-integration.service';
import { ImmigrantrusIntegrationController } from './immigrantrus-integration.controller';
import { GetSnugService } from './getsnug.service';
import { PracticeAreaService } from './practice-area.service';

@Module({
  imports: [HttpModule],
  providers: [
    ImmigrantrusIntegrationService,
    GetSnugService,
    PracticeAreaService,
  ],
  controllers: [ImmigrantrusIntegrationController],
  exports: [
    ImmigrantrusIntegrationService,
    GetSnugService,
    PracticeAreaService,
  ],
})
export class ImmigrantrusIntegrationModule {}
