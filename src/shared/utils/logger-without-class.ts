import { Logger } from "@nestjs/common";
import { NestApplication } from "@nestjs/core";

export class LoggerWithoutClass {
    static readonly logger = new Logger(NestApplication.name, {
        timestamp: true,
      });
}