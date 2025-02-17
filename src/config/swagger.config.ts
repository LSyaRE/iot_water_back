import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environments } from './configuration';


export function initSwagger(app: INestApplication<any>) {
    
    const config = new DocumentBuilder()
    .setTitle(environments.swagger.title)
    .setDescription(environments.swagger.description)
    .setVersion(environments.swagger.version)
    .addTag('cats')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
