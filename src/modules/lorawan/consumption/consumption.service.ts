import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatosConsumoAgua, DatosConsumoAguaDocument } from '../consumption/schemas/consumption.schema';
import { CreateDatosConsumoAguaDto } from '../consumption/dtos/create-consumption.dto';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class DatosConsumoAguaService {
  constructor(
    @InjectModel(DatosConsumoAgua.name)
    private readonly datosConsumoAguaModel: Model<DatosConsumoAguaDocument>,
  ) {}

  async findAll(): Promise<DatosConsumoAgua[]> {
    return this.datosConsumoAguaModel.find().exec();
  }

  async findOne(id: string): Promise<DatosConsumoAgua> {
    const lectura = await this.datosConsumoAguaModel.findOne({ idLectura: id }).exec();
    if (!lectura) {
      throw new NotFoundException(`Lectura with ID "${id}" not found.`);
    }
    return lectura;
  }

  async create(createDatosConsumoAguaDto: CreateDatosConsumoAguaDto): Promise<DatosConsumoAgua> {
    const idLectura = uuidv4(); // Generate UUID for idLectura
    const createdLectura = new this.datosConsumoAguaModel({
      ...createDatosConsumoAguaDto,
      idLectura,
    });
    return createdLectura.save();
  }

  async findByDispositivoId(dispositivoId: string): Promise<DatosConsumoAgua[]> {
    return this.datosConsumoAguaModel.find({ idDispositivo: dispositivoId }).exec();
  }

  async findByDispositivoIdAndDateRange(
    dispositivoId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<DatosConsumoAgua[]> {
    return this.datosConsumoAguaModel
      .find({
        idDispositivo: dispositivoId,
        timestamp: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.datosConsumoAguaModel.deleteOne({ idLectura: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Lectura with ID "${id}" not found.`);
    }
  }
}