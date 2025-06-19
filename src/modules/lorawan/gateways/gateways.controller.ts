import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { GatewayService } from '../gateways/gateways.service';
import { CreateGatewayDto } from '../gateways/dto/create-gateway.dto';
import { UpdateGatewayDto } from '../gateways/dto/update-gateway.dto';
import { Gateway } from '../gateways/entities/gateway.entity';

@Controller('gateways')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.gatewayService.create(createGatewayDto);
  }

  @Get()
  findAll(): Promise<Gateway[]> {
    return this.gatewayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Gateway> {
    return this.gatewayService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGatewayDto: UpdateGatewayDto): Promise<Gateway> {
    return this.gatewayService.update(id, updateGatewayDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.gatewayService.remove(id);
  }
}