import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './config/swagger.config';
import { environments } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add Swagger documentation
  initSwagger(app);
  await app.listen(environments.port ?? 3000);
}
bootstrap();
