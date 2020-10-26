import * as dotenvSafe from 'dotenv-safe';
dotenvSafe.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: true,
    transformOptions: {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    }
  }));
  
  app.enableCors({ origin: '*' });

  app.setGlobalPrefix('api');
  
  const options = new DocumentBuilder()
    .setTitle('Banshee S.A.')
    .setDescription('InfoClientes')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('documentation', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
