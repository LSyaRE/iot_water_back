import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MantenimientoDispositivoService } from '../maintenance/maintenance.service';
import { CreateMantenimientoDispositivoDto } from '../maintenance/dtos/create-maintenance.dto';
import { UpdateMantenimientoDispositivoDto } from '../maintenance/dtos/update-maintenance.dto';
import { MantenimientoDispositivo } from '../maintenance/entities/device-maintenance.entity';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('mantenimientos')
export class MantenimientoDispositivoController {
  constructor(private readonly mantenimientoService: MantenimientoDispositivoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMantenimientoDto: CreateMantenimientoDispositivoDto): Promise<MantenimientoDispositivo> {
    return this.mantenimientoService.create(createMantenimientoDto);
  }

  @Get()
  findAll(): Promise<MantenimientoDispositivo[]> {
    return this.mantenimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<MantenimientoDispositivo> {
    return this.mantenimientoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateMantenimientoDto: UpdateMantenimientoDispositivoDto): Promise<MantenimientoDispositivo> {
    return this.mantenimientoService.update(id, updateMantenimientoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mantenimientoService.remove(id);
  }

  @Get('dispositivo/:dispositivoId')
  findByDispositivo(@Param('dispositivoId', ParseUUIDPipe) dispositivoId: string): Promise<MantenimientoDispositivo[]> {
    return this.mantenimientoService.findByDispositivoId(dispositivoId);
  }
}