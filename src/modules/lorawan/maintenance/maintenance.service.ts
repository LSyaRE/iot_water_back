import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MantenimientoDispositivo } from '../maintenance/entities/device-maintenance.entity';
import { CreateMantenimientoDispositivoDto } from '../maintenance/dtos/create-maintenance.dto';
import { UpdateMantenimientoDispositivoDto } from '../maintenance/dtos/update-maintenance.dto';

@Injectable()
export class MantenimientoDispositivoService {
  constructor(
    @InjectRepository(MantenimientoDispositivo)
    private readonly mantenimientoRepository: Repository<MantenimientoDispositivo>,
  ) {}

  async findAll(): Promise<MantenimientoDispositivo[]> {
    return this.mantenimientoRepository.find();
  }

  async findOne(id: string): Promise<MantenimientoDispositivo> {
    const mantenimiento = await this.mantenimientoRepository.findOne({ where: { idMantenimiento: id } });
    if (!mantenimiento) {
      throw new NotFoundException(`Mantenimiento with ID "${id}" not found.`);
    }
    return mantenimiento;
  }

  async create(createMantenimientoDto: CreateMantenimientoDispositivoDto): Promise<MantenimientoDispositivo> {
    const newMantenimiento = this.mantenimientoRepository.create(createMantenimientoDto);
    return this.mantenimientoRepository.save(newMantenimiento);
  }

  async update(id: string, updateMantenimientoDto: UpdateMantenimientoDispositivoDto): Promise<MantenimientoDispositivo> {
    const mantenimiento = await this.findOne(id);
    Object.assign(mantenimiento, updateMantenimientoDto);
    return this.mantenimientoRepository.save(mantenimiento);
  }

  async remove(id: string): Promise<void> {
    const result = await this.mantenimientoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Mantenimiento with ID "${id}" not found.`);
    }
  }

  async findByDispositivoId(dispositivoId: string): Promise<MantenimientoDispositivo[]> {
    return this.mantenimientoRepository.find({ where: { idDispositivo: dispositivoId } });
  }
}