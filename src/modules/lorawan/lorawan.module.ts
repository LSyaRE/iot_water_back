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

// CONTROLADORES
import { GatewayController } from '../lorawan/gateways/gateways.controller';
import { DispositivoController } from '../lorawan/devices/devices.controller';
import { DatosConsumoAguaController } from '../lorawan/consumption/consumption.controller';
import { MantenimientoDispositivoController } from '../lorawan/maintenance/maintenance.controller';

// SERVICIOS
import { GatewayService } from '../lorawan/gateways/gateways.service';
import { DispositivoService } from '../lorawan/devices/devices.service';
import { DatosConsumoAguaService } from '../lorawan/consumption/consumption.service';
import { MantenimientoDispositivoService } from '../lorawan/maintenance/maintenance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Gateway,
      Dispositivo,
      MantenimientoDispositivo
    ]),
    MongooseModule.forFeature([
      { name: DatosConsumoAgua.name, schema: DatosConsumoAguaSchema },
    ]),
    JwtModule.register({})
  ],
  controllers: [
    GatewayController,
    DispositivoController,
    DatosConsumoAguaController,
    MantenimientoDispositivoController,
  ],
  providers: [
    GatewayService,
    DispositivoService,
    DatosConsumoAguaService,
    MantenimientoDispositivoService,
  ],
  exports: [
    DispositivoService,
    GatewayService,
    DatosConsumoAguaService,
    MantenimientoDispositivoService,
  ]
})
export class LorawanModule {}
