import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_RT_NAME } from '@shared/consts';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, JWT_RT_NAME) {
  constructor(private configService: ConfigService) {
    const rtSecret: string = configService.get('RT_SECRET') ?? 'rt-secret';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: rtSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any): unknown {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '');
    return {
      ...payload,
      refreshToken,
    };
  }
}
