import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Iot water')
    .setDescription('Proyecto para medir el agua')
    .setVersion('0.0.1')
    .addTag('water')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
