import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

// ENTIDADES SQL
import { Gateway } from '../lorawan/gateways/entities/gateway.entity';
import { Dispositivo } from '../lorawan/devices/entities/device.entity';
import { MantenimientoDispositivo } from '../lorawan/maintenance/entities/device-maintenance.entity';

// ESQUEMAS NoSQL
import { DatosConsumoAgua, DatosConsumoAguaSchema } from '../lorawan/consumption/schemas/consumption.schema';
import { LogTecnicoDispositivo, LogTecnicoDispositivoSchema } from '../lorawan/logs/schemas/device-log.schema';

// CONTROLADORES
import { GatewayController } from '../lorawan/gateways/gateways.controller';
import { DispositivoController } from '../lorawan/devices/devices.controller';
import { DatosConsumoAguaController } from '../lorawan/consumption/consumption.controller';
import { MantenimientoDispositivoController } from '../lorawan/maintenance/maintenance.controller';
import { LogTecnicoDispositivoController } from '../lorawan/logs/logs.controller';

// SERVICIOS
import { GatewayService } from '../lorawan/gateways/gateways.service';
import { DispositivoService } from '../lorawan/devices/devices.service';
import { DatosConsumoAguaService } from '../lorawan/consumption/consumption.service';
import { MantenimientoDispositivoService } from '../lorawan/maintenance/maintenance.service';
import { LogTecnicoDispositivoService } from '../lorawan/logs/logs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Gateway,
      Dispositivo,
      MantenimientoDispositivo
    ]),
    MongooseModule.forFeature([
      { name: DatosConsumoAgua.name, schema: DatosConsumoAguaSchema },
      { name: LogTecnicoDispositivo.name, schema: LogTecnicoDispositivoSchema }
    ]),
    JwtModule.register({}) // Solo si vas a proteger endpoints con JWT
  ],
  controllers: [
    GatewayController,
    DispositivoController,
    DatosConsumoAguaController,
    MantenimientoDispositivoController,
    LogTecnicoDispositivoController
  ],
  providers: [
    GatewayService,
    DispositivoService,
    DatosConsumoAguaService,
    MantenimientoDispositivoService,
    LogTecnicoDispositivoService
  ],
  exports: [
    DispositivoService,
    GatewayService,
    DatosConsumoAguaService,
    MantenimientoDispositivoService,
    LogTecnicoDispositivoService
  ]
})
export class LorawanModule {}
