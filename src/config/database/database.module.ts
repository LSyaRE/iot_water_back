import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresDatabaseConfig } from './postgres-database.config';

@Global()
@Module({
  imports: [TypeOrmModule.forRootAsync(postgresDatabaseConfig())],
})
export class DatabaseModule {}
