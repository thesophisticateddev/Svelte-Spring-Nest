import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakconfigService implements KeycloakConnectOptionsFactory {
  constructor(private config: ConfigService) {}
  createKeycloakConnectOptions():
    | KeycloakConnectOptions
    | Promise<KeycloakConnectOptions> {
    return {
      authServerUrl: this.config.getOrThrow('AUTH_SERVER_URL'),
      realm: this.config.getOrThrow('AUTH_REALM'),
      clientId: this.config.getOrThrow('AUTH_CLIENT_ID'),
      secret: this.config.getOrThrow('AUTH_SECRET'),
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
