import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from '@config/swagger.config';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { LoggerWithoutClass } from '@shared/utils/logger-without-class';
import { ConfigService } from '@nestjs/config';

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

  const configService = new ConfigService();
  const port = configService.get('PORT') || 3000;

  LoggerWithoutClass.logger.log(`Running on port: ${port}`);
}
void bootstrap()
  .then((r) => r)
  .catch();
