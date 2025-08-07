// Embedded MCP Module for TwentyCRM
import { Module } from '@nestjs/common';
import { EmbeddedMCPService } from './embedded-mcp.service';

@Module({
  providers: [EmbeddedMCPService],
  exports: [EmbeddedMCPService],
})
export class EmbeddedMCPModule {}
