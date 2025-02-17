import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';

@Module({
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthModule {}
