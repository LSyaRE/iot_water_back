import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayService } from './gateways.service';
import { GatewayController } from './gateways.controller';
import { Gateway } from './entities/gateway.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gateway])],
  controllers: [GatewayController],
  providers: [GatewayService],
  exports: [GatewayService] // Export if other modules need to use GatewayService
})
export class GatewayModule {}