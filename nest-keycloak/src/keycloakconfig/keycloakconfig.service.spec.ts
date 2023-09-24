import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakconfigService } from './keycloakconfig.service';

describe('KeycloakconfigService', () => {
  let service: KeycloakconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakconfigService],
    }).compile();

    service = module.get<KeycloakconfigService>(KeycloakconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
