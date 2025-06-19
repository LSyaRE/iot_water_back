import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, Min, Max, IsEnum, IsDateString, IsBoolean, Length, IsObject } from 'class-validator';
import { TipoDispositivo, EstadoOperacional } from '../entities/device.entity';

export class CreateDispositivoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  numeroSerie: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  nombre: string;

  @IsNotEmpty()
  @IsEnum(TipoDispositivo)
  tipo: TipoDispositivo;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  modelo?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  fabricante?: string;

  @IsNotEmpty()
  @IsDateString()
  fechaInstalacion: Date;

  @IsNotEmpty()
  @IsEnum(EstadoOperacional)
  estadoOperacional: EstadoOperacional;

  @IsOptional()
  @IsDateString()
  ultimaComunicacion?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  nivelBateria?: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  senalLoRa?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  versionFirmware?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  umbralAlerta?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  frecuenciaReporte?: string;

  @IsOptional()
  @IsObject()
  configuracionPersonalizada?: Record<string, any>;

  @IsNotEmpty()
  @IsBoolean()
  bajoMonitoreo: boolean;

  @IsNotEmpty()
  @IsUUID()
  idGatewayPrincipal: string; // Or @IsNumber()

  @IsOptional()
  @IsUUID()
  idClienteAsociado?: string; // Or @IsNumber()

  @IsNotEmpty()
  @IsUUID()
  idSector: string; // Or @IsNumber()

  @IsOptional()
  @IsString()
  direccion?: string;

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
}