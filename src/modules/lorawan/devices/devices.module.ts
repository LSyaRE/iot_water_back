import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispositivoService } from './devices.service';
import { DispositivoController } from './devices.controller';
import { Dispositivo } from './entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dispositivo])],
  controllers: [DispositivoController],
  providers: [DispositivoService],
  exports: [DispositivoService], // Export if other modules need to use DispositivoService
})
export class DispositivoModule {}