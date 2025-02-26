import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthenticationFacade } from '@auth/facades';
import { AuthDto, LoginDto } from '@auth/dtos';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AtGuard, RtGuard } from '@shared/guards';
import { GetCurrentUser, Public, GetCurrentUserId } from '@shared/decorators';

@Controller('auth')
@ApiBearerAuth()
export class AuthenticationController {
  constructor(private readonly authenticationFacade: AuthenticationFacade) {}

  @Public()
  @Post('login')
  public login(@Body() payload: LoginDto): any {
    return this.authenticationFacade.login(payload);
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public register(@Body() payload: AuthDto) {
    return this.authenticationFacade.register(payload);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  public logout(@GetCurrentUserId() userId: number) {
    return this.authenticationFacade.logout(userId);
  }

  @Post('restore-password')
  public restorePassword(): any {
    return this.authenticationFacade.restorePassword(0);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  public refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): any {
    return this.authenticationFacade.refresh({ userId, refreshToken });
  }
}
