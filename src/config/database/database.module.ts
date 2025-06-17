import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresDatabaseConfig } from './postgres-database.config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoDatabaseConfig } from './mongo-database.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync(postgresDatabaseConfig()),
    MongooseModule.forRootAsync(mongoDatabaseConfig()),
  ],
})
export class DatabaseModule {}
