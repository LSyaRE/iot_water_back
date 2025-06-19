import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { DatosConsumoAguaService } from '../consumption/consumption.service';
import { CreateDatosConsumoAguaDto } from '../consumption/dtos/create-consumption.dto';
import { DatosConsumoAgua } from '../consumption/schemas/consumption.schema';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('consumo-agua')
export class DatosConsumoAguaController {
  constructor(private readonly datosConsumoAguaService: DatosConsumoAguaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDatosConsumoAguaDto: CreateDatosConsumoAguaDto): Promise<DatosConsumoAgua> {
    return this.datosConsumoAguaService.create(createDatosConsumoAguaDto);
  }

  @Get()
  findAll(): Promise<DatosConsumoAgua[]> {
    return this.datosConsumoAguaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DatosConsumoAgua> {
    return this.datosConsumoAguaService.findOne(id);
  }

  @Get('dispositivo/:dispositivoId')
  findByDispositivo(
    @Param('dispositivoId', ParseUUIDPipe) dispositivoId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<DatosConsumoAgua[]> {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return this.datosConsumoAguaService.findByDispositivoIdAndDateRange(dispositivoId, start, end);
    }
    return this.datosConsumoAguaService.findByDispositivoId(dispositivoId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.datosConsumoAguaService.remove(id);
  }
}