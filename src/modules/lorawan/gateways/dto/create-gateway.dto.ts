import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, Min, Max, IsEnum, IsDateString, Length } from 'class-validator';
import { GatewayStatus } from '../entities/gateway.entity';

export class CreateGatewayDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  numeroSerie: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitud?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitud?: number;

  @IsNotEmpty()
  @IsDateString()
  fechaInstalacion: Date;

  @IsNotEmpty()
  @IsEnum(GatewayStatus)
  estado: GatewayStatus;

  @IsOptional()
  @IsDateString()
  ultimaComunicacion?: Date;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  versionFirmware?: string;
}