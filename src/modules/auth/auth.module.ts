import { Module } from '@nestjs/common';
import { AuthenticationController } from '@auth/controllers';
import { UserService, AuthenticationService } from '@auth/services';
import { AuthenticationFacade } from '@auth/facades';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@auth/entities';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
  providers: [
    AuthenticationFacade,
    AtStrategy,
    RtStrategy,
    UserService,
    AuthenticationService,
    UserEntity,
  ],
  exports: [UserService],
  controllers: [AuthenticationController],
})
export class AuthModule {}
