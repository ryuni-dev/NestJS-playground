import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { prototype } from 'events';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  
  const serverConfig = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);
  logger.log(`Application runngin on port ${port}`)
}
bootstrap();
