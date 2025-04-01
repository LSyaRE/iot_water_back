import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTResponse } from '@shared/interfaces/JWTResponse';

/**
 * Anotación que sirve para obtener los datos provenientes del JWT
 * @author  Jonas Villacis <javillacis@luminesway.com>
 * @version 1.0 28-03-2025
 *
 */
export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): any => {
    const request: { user: JWTResponse } = context.switchToHttp().getRequest();

    if (!data) return request.user;

    return request?.user[data];
  },
);
