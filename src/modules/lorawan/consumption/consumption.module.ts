import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatosConsumoAguaService } from './consumption.service';
import { DatosConsumoAguaController } from './consumption.controller';
import { DatosConsumoAgua, DatosConsumoAguaSchema } from './schemas/consumption.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DatosConsumoAgua.name, schema: DatosConsumoAguaSchema }])],
  controllers: [DatosConsumoAguaController],
  providers: [DatosConsumoAguaService],
})
export class DatosConsumoAguaModule {}