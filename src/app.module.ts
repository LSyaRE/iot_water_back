import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@auth/auth.module';
import { CoreModule } from '@core/core.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '@config/database';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from '@shared/guards';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123@localhost:27017/iot-water'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CoreModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
