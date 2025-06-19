import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DatosConsumoAguaDocument = DatosConsumoAgua & Document;

export enum EstadoLectura {
  Normal = 'Normal',
  Anomalia = 'Anomalía',
  Missing = 'Missing',
}

@Schema({ collection: 'datosConsumoAgua', timestamps: true }) // timestamps adds createdAt and updatedAt
export class DatosConsumoAgua {
  // MongoDB automatically creates _id. We can use it as our idLectura.
  // If you want a UUID string, you'll generate it in the service and assign it.
  @Prop({ type: String, required: false, unique: true }) // Using string for UUID
  idLectura?: string;

  @Prop({ type: String, required: true }) // Reference to Dispositivos.IdDispositivo (UUID as string)
  idDispositivo: string;

  @Prop({ type: Date, required: true, default: Date.now })
  timestamp: Date;

  @Prop({ type: Number, required: true })
  consumoM3: number;

  @Prop({ type: String, required: true, maxlength: 10 })
  unidad: string; // ej. 'm³'

  @Prop({ type: String, enum: EstadoLectura, required: true })
  estadoLectura: EstadoLectura;
}

export const DatosConsumoAguaSchema = SchemaFactory.createForClass(DatosConsumoAgua);