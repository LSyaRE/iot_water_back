import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispositivo } from '../devices/entities/device.entity';
import { CreateDispositivoDto } from '../devices/dto/create-device.dto';
import { UpdateDispositivoDto } from '../devices/dto/update-device.dto';

@Injectable()
export class DispositivoService {
  constructor(
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
  ) {}

  async findAll(): Promise<Dispositivo[]> {
    return this.dispositivoRepository.find();
  }

  async findOne(id: string): Promise<Dispositivo> {
    const dispositivo = await this.dispositivoRepository.findOne({ where: { idDispositivo: id } });
    if (!dispositivo) {
      throw new NotFoundException(`Dispositivo with ID "${id}" not found.`);
    }
    return dispositivo;
  }

  async create(createDispositivoDto: CreateDispositivoDto): Promise<Dispositivo> {
    const existingDispositivo = await this.dispositivoRepository.findOne({ where: { numeroSerie: createDispositivoDto.numeroSerie } });
    if (existingDispositivo) {
      throw new ConflictException(`Dispositivo with serial number "${createDispositivoDto.numeroSerie}" already exists.`);
    }
    const newDispositivo = this.dispositivoRepository.create(createDispositivoDto);
    return this.dispositivoRepository.save(newDispositivo);
  }

  async update(id: string, updateDispositivoDto: UpdateDispositivoDto): Promise<Dispositivo> {
    const dispositivo = await this.findOne(id);

    if (updateDispositivoDto.numeroSerie && updateDispositivoDto.numeroSerie !== dispositivo.numeroSerie) {
      const existingDispositivo = await this.dispositivoRepository.findOne({ where: { numeroSerie: updateDispositivoDto.numeroSerie } });
      if (existingDispositivo && existingDispositivo.idDispositivo !== id) {
        throw new ConflictException(`Another Dispositivo with serial number "${updateDispositivoDto.numeroSerie}" already exists.`);
      }
    }

    Object.assign(dispositivo, updateDispositivoDto);
    return this.dispositivoRepository.save(dispositivo);
  }

  async remove(id: string): Promise<void> {
    const result = await this.dispositivoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dispositivo with ID "${id}" not found.`);
    }
  }

  async findByGatewayId(gatewayId: string): Promise<Dispositivo[]> {
    return this.dispositivoRepository.find({ where: { idGatewayPrincipal: gatewayId } });
  }
}