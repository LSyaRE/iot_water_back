import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

export enum GatewayStatus {
  Online = 'Online',
  Offline = 'Offline',
  Falla = 'Falla',
  EnMantenimiento = 'En Mantenimiento',
}

@Entity('gateways')
@Unique(['numeroSerie'])
export class Gateway {
  @PrimaryGeneratedColumn('uuid') // Or 'increment' for INT
  idGateway: string; // Or number for INT

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  numeroSerie: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  ubicacion: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitud: number;

  @Column({ type: 'date', nullable: false })
  fechaInstalacion: Date;

  @Column({ type: 'enum', enum: GatewayStatus, nullable: false })
  estado: GatewayStatus;

  @Column({ type: 'timestamp', nullable: true })
  ultimaComunicacion: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  versionFirmware: string;
}