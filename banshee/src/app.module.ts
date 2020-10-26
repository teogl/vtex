import { Module } from '@nestjs/common';
import { MicroserviceModule, ManagerAdapterBus, LocalBusAdapter } from '@addapptables/microservice';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { getPrototypes } from './utils/files';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/exception-filter';

const modules = getPrototypes(
  `${__dirname}/*/*.module{.ts,.js}`
);

@Module({
  imports: [
    MicroserviceModule.withConfig({
      adapter: ManagerAdapterBus
        .getInstance(LocalBusAdapter)
        .build(),
      logger: {
        debug: false
      }
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      url: process.env.DB_URL,
      useUnifiedTopology: true,
      entities: [
        resolve(__dirname, '**/*.entity{.ts,.js}')
      ]
    }),
    ...modules
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ]
})
export class AppModule {}
