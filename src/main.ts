import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from '@config/swagger.config';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      // json: true
    }),
  });

  // Add Swagger documentation
  initSwagger(app);
  //Add Validations dependency
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Running on port: ${process.env.PORT}`);
}
void bootstrap()
  .then((r) => r)
  .catch();
