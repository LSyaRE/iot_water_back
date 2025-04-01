import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC, JWT_AT_NAME } from '@shared/consts';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

/**
 * Guard que permite validar el token JWT
 * @author  Jonas Villacis <javillacis@luminesway.com>
 * @version 1.0 28-03-2025
 *
 */
@Injectable()
export class AtGuard extends AuthGuard(JWT_AT_NAME) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic: unknown = this.reflector.getAllAndOverride(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
