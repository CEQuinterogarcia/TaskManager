import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from "@nestjs/common";
import { environmentVariables } from "./config";
import { GlobalRpcExceptionFilter } from './common/exceptions/rpc-exceptions.filter';

async function main() {
  const logger = new Logger('Api');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )


  await app.listen(environmentVariables.port);
  logger.log(`Api is running on port ${environmentVariables.port}`)
}
main();
