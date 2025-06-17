import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const mongoDatabaseConfig = (): MongooseModuleAsyncOptions => ({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        authSource: configService.get<string>('MONGO_AUTH_SOURCE'), 
    }),
   inject: [ConfigService], 
});