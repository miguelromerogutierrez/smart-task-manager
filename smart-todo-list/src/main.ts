import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * How to add cors to nestjs
 * https://docs.nestjs.com/security/cors
 * Can you give me an example of how to add cors to nestjs?
 * https://stackoverflow.com/questions/63491169/can-you-give-me-an-example-of-how-to-add-cors-to-nestjs
 * 
 */


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
