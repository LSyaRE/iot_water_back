import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosConsumoAguaDto } from './create-consumption.dto';

export class UpdateDatosConsumoAguaDto extends PartialType(CreateDatosConsumoAguaDto) {}