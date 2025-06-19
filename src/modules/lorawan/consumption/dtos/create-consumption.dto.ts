import { IsString, IsNotEmpty, IsUUID, IsNumber, IsEnum, IsDateString, Length, IsOptional, Min } from 'class-validator';
import { EstadoLectura } from '../schemas/consumption.schema';

export class CreateDatosConsumoAguaDto {
  @IsNotEmpty()
  @IsUUID()
  idDispositivo: string;

  @IsNotEmpty()
  @IsDateString()
  timestamp: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  consumoM3: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  unidad: string;

  @IsNotEmpty()
  @IsEnum(EstadoLectura)
  estadoLectura: EstadoLectura;
}