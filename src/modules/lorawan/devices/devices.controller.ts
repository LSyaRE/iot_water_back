import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DispositivoService } from '../devices/devices.service';
import { CreateDispositivoDto } from '../devices/dto/create-device.dto';
import { UpdateDispositivoDto } from '../devices/dto/update-device.dto';
import { Dispositivo } from '../devices/entities/device.entity';

@Controller('dispositivos')
export class DispositivoController {
  constructor(private readonly dispositivoService: DispositivoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDispositivoDto: CreateDispositivoDto): Promise<Dispositivo> {
    return this.dispositivoService.create(createDispositivoDto);
  }

  @Get()
  findAll(): Promise<Dispositivo[]> {
    return this.dispositivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dispositivo> {
    return this.dispositivoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispositivoDto: UpdateDispositivoDto): Promise<Dispositivo> {
    return this.dispositivoService.update(id, updateDispositivoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.dispositivoService.remove(id);
  }

  @Get('by-gateway/:gatewayId')
  findByGateway(@Param('gatewayId') gatewayId: string): Promise<Dispositivo[]> {
    return this.dispositivoService.findByGatewayId(gatewayId);
  }
}