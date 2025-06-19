import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MantenimientoDispositivoService } from './maintenance.service';
import { MantenimientoDispositivoController } from './maintenance.controller';
import { MantenimientoDispositivo } from './entities/device-maintenance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MantenimientoDispositivo])],
  controllers: [MantenimientoDispositivoController],
  providers: [MantenimientoDispositivoService],
})
export class MantenimientoDispositivoModule {}