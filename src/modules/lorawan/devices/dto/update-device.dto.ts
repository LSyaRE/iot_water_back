import { PartialType } from '@nestjs/mapped-types';
import { CreateDispositivoDto } from './create-device.dto';

export class UpdateDispositivoDto extends PartialType(CreateDispositivoDto) {}