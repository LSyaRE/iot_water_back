import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gateway } from '../gateways/entities/gateway.entity';
import { CreateGatewayDto } from '../gateways/dto/create-gateway.dto';
import { UpdateGatewayDto } from '../gateways/dto/update-gateway.dto';

@Injectable()
export class GatewayService {
  constructor(
    @InjectRepository(Gateway)
    private readonly gatewayRepository: Repository<Gateway>,
  ) {}

  async findAll(): Promise<Gateway[]> {
    return this.gatewayRepository.find();
  }

  async findOne(id: string): Promise<Gateway> {
    const gateway = await this.gatewayRepository.findOne({ where: { idGateway: id } });
    if (!gateway) {
      throw new NotFoundException(`Gateway with ID "${id}" not found.`);
    }
    return gateway;
  }

  async create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    const existingGateway = await this.gatewayRepository.findOne({ where: { numeroSerie: createGatewayDto.numeroSerie } });
    if (existingGateway) {
      throw new ConflictException(`Gateway with serial number "${createGatewayDto.numeroSerie}" already exists.`);
    }
    const newGateway = this.gatewayRepository.create(createGatewayDto);
    return this.gatewayRepository.save(newGateway);
  }

  async update(id: string, updateGatewayDto: UpdateGatewayDto): Promise<Gateway> {
    const gateway = await this.findOne(id);

    if (updateGatewayDto.numeroSerie && updateGatewayDto.numeroSerie !== gateway.numeroSerie) {
      const existingGateway = await this.gatewayRepository.findOne({ where: { numeroSerie: updateGatewayDto.numeroSerie } });
      if (existingGateway && existingGateway.idGateway !== id) {
        throw new ConflictException(`Another Gateway with serial number "${updateGatewayDto.numeroSerie}" already exists.`);
      }
    }

    Object.assign(gateway, updateGatewayDto);
    return this.gatewayRepository.save(gateway);
  }

  async remove(id: string): Promise<void> {
    const result = await this.gatewayRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gateway with ID "${id}" not found.`);
    }
  }
}