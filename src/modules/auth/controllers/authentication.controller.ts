import { Controller, Get } from '@nestjs/common';

import { AuthenticationService } from '@auth/services';
import { GenericResponseDto } from 'src/modules/core/dtos/generic-reponse.dto';

@Controller('authentication')
export class AuthenticationController {
  @Get('/api/')
  public authenticate(): GenericResponseDto {
    return {
      message: 'Authentication successful',
      timestamp: new Date(),
    };
  }
}
