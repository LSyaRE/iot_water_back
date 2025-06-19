import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, Min, IsEnum, IsDateString, IsBoolean } from 'class-validator';
import { TipoMantenimiento } from '../entities/device-maintenance.entity';

export class CreateMantenimientoDispositivoDto {
  @IsNotEmpty()
  @IsUUID()
  idDispositivo: string; // Or @IsNumber()

  @IsNotEmpty()
  @IsDateString()
  fechaMantenimiento: Date;

  @IsNotEmpty()
  @IsEnum(TipoMantenimiento)
  tipoMantenimiento: TipoMantenimiento;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  duracionMinutos?: number;

  @IsOptional()
  @IsUUID()
  realizadoPorUsuario?: string; // Or @IsNumber()

  @IsNotEmpty()
  @IsBoolean()
  realizadoPorSistema: boolean;

  @IsOptional()
  @IsString()
  notasInternas?: string;

  @IsOptional()
  @IsDateString()
  proximoMantenimientoFecha?: Date;

  @IsOptional()
  @IsString()
  proximoMantenimientoDescripcion?: string;
}