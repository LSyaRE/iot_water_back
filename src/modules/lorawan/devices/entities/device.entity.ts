import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

export enum TipoDispositivo {
  Medidor = 'Medidor',
  Valvula = 'Válvula',
  Sensor = 'Sensor',
}

export enum EstadoOperacional {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
  EnRevision = 'En revisión',
  Reemplazado = 'Reemplazado',
  Conectado = 'Conectado',
  Inestable = 'Inestable',
  Falla = 'Falla',
}

@Entity('dispositivos')
@Unique(['numeroSerie'])
export class Dispositivo {
  @PrimaryGeneratedColumn('uuid') // Or 'increment' for INT
  idDispositivo: string; // Or number for INT

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  numeroSerie: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'enum', enum: TipoDispositivo, nullable: false })
  tipo: TipoDispositivo;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modelo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  fabricante: string;

  @Column({ type: 'date', nullable: false })
  fechaInstalacion: Date;

  @Column({ type: 'enum', enum: EstadoOperacional, nullable: false })
  estadoOperacional: EstadoOperacional;

  @Column({ type: 'timestamp', nullable: true })
  ultimaComunicacion: Date;

  @Column({ type: 'int', nullable: true })
  nivelBateria: number; // 0-100, %

  @Column({ type: 'varchar', length: 50, nullable: true })
  senalLoRa: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  versionFirmware: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  umbralAlerta: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  frecuenciaReporte: string;

  @Column({ type: 'jsonb', nullable: true })
  configuracionPersonalizada: Record<string, any>;

  @Column({ type: 'boolean', nullable: false })
  bajoMonitoreo: boolean;

  @Column({ type: 'uuid', nullable: false }) // FK a Gateways.IdGateway
  idGatewayPrincipal: string; // Or number for INT

  @Column({ type: 'uuid', nullable: true }) // FK a Clientes.IdCliente
  idClienteAsociado: string; // Or number for INT

  @Column({ type: 'uuid', nullable: false }) // FK a Sectores.IdSector
  idSector: string; // Or number for INT

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitud: number;
}