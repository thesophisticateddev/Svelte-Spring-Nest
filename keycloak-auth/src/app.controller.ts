import { Controller, Get } from '@nestjs/common';
import { Public, Roles } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/another')
 //  @Roles({ roles: ['admin'] })
  getAnother(): string {
    return 'Another end point';
  }
}
