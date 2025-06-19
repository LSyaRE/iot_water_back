import { PartialType } from '@nestjs/mapped-types';
import { CreateMantenimientoDispositivoDto } from './create-maintenance.dto';

export class UpdateMantenimientoDispositivoDto extends PartialType(CreateMantenimientoDispositivoDto) {}