import { Module } from '@nestjs/common';
import { getPrototypes } from '../utils/files';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from '../country/country.module';
import { SellerModule } from '../seller/seller.module';

const controllers = getPrototypes(
  `${__dirname}/api/controllers/*{.ts,.js}`,
);

const apiServices = getPrototypes(
  `${__dirname}/api/services/*{.ts,.js}`,
);

const handlers = getPrototypes(
  `${__dirname}/domain/handlers/*{.ts,.js}`,
);

const repositories = getPrototypes(
  `${__dirname}/database/repositories/*{.ts,.js}`,
);

const domainServices = getPrototypes(
  `${__dirname}/domain/services/*{.ts,.js}`,
);

const database = TypeOrmModule.forFeature([...repositories]);

@Module({
  imports: [
    database,
    CountryModule,
    SellerModule
  ],
  controllers: [...controllers],
  providers: [
    ...apiServices,
    ...handlers,
    ...domainServices
  ],
  exports: [],
})
export class ClientInfoModule { }
