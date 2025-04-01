import { AuthGuard } from '@nestjs/passport';
import { JWT_RT_NAME } from '@shared/consts';
import { Injectable } from '@nestjs/common';

/**
 * Guard que valida el Refresh Token del usuario
 * @author  Jonas Villacis <javillacis@luminesway.com>
 * @version 1.0 28-03-2025
 *
 */
@Injectable()
export class RtGuard extends AuthGuard(JWT_RT_NAME) {
  constructor() {
    super();
  }
}
