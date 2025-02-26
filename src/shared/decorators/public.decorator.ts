import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC } from '@shared/consts';

/**
 * Decorador que me permite hacer público los endpoints
 * @author  Jonas Villacis <javillacis@luminesway.com>
 * @version 1.0 28-03-2025
 *
 */
export const Public = () => SetMetadata(IS_PUBLIC, true);
