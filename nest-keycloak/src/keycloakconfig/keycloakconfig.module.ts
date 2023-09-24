import { Module } from '@nestjs/common';
import { KeycloakconfigService } from './keycloakconfig.service';

@Module({
  providers: [KeycloakconfigService],
  exports: [KeycloakconfigService],
})
export class KeycloakconfigModule {}
