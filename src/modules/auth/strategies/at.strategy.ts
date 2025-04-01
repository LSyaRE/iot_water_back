import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '@auth/types';
import { JWT_AT_NAME } from '@shared/consts';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, JWT_AT_NAME) {
  constructor(private configService: ConfigService) {
    const atSecret: string = configService.get('AT_SECRET') ?? 'at-secret';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: atSecret,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
