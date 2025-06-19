import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TipoMantenimiento {
  ReemplazoBateria = 'Reemplazo de batería',
  ActualizacionFirmware = 'Actualización de firmware',
  InstalacionInicial = 'Instalación inicial',
  RevisionProgramada = 'Revisión programada',
  Reparacion = 'Reparación',
  Reemplazo = 'Reemplazo',
}

@Entity('mantenimientos_dispositivo')
export class MantenimientoDispositivo {
  @PrimaryGeneratedColumn('uuid') // Or 'increment' for INT
  idMantenimiento: string; // Or number for INT

  @Column({ type: 'uuid', nullable: false }) // FK a Dispositivos.IdDispositivo
  idDispositivo: string; // Or number for INT

  @Column({ type: 'timestamp', nullable: false })
  fechaMantenimiento: Date;

  @Column({ type: 'enum', enum: TipoMantenimiento, nullable: false })
  tipoMantenimiento: TipoMantenimiento;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  duracionMinutos: number;

  @Column({ type: 'uuid', nullable: true }) // FK a Usuarios.IdUsuario
  realizadoPorUsuario: string; // Or number for INT

  @Column({ type: 'boolean', nullable: false })
  realizadoPorSistema: boolean;

  @Column({ type: 'text', nullable: true })
  notasInternas: string;

  @Column({ type: 'date', nullable: true })
  proximoMantenimientoFecha: Date;

  @Column({ type: 'text', nullable: true })
  proximoMantenimientoDescripcion: string;
}