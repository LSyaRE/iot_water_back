import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTResponse } from '@shared/interfaces/JWTResponse';

/**
 * Decorador que sirve para extraer el valor sub de la response del JWT
 * @author  Jonas Villacis <javillacis@luminesway.com>
 * @version 1.0 28-03-2025
 *
 */
export const GetCurrentUserId = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): number => {
    const request: { user: JWTResponse } = context.switchToHttp().getRequest();

    return request?.user.sub;
  },
);
