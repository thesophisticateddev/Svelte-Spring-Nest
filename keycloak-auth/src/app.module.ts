import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakconfigService } from './keycloakconfig/keycloakconfig.service';
import { KeycloakconfigModule } from './keycloakconfig/keycloakconfig.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KeycloakconfigModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakconfigService,
      imports: [ConfigModule, KeycloakconfigModule],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    KeycloakconfigService,
  ],
})
export class AppModule {}
