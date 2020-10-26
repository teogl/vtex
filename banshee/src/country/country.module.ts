import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { getPrototypes } from '../utils/files';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryRepository } from './database/repositories/country.repository';
import { ObjectID } from 'mongodb';

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

const database = TypeOrmModule.forFeature([...repositories]);

@Module({
  imports: [
    database
  ],
  controllers: [...controllers],
  providers: [
    ...apiServices,
    ...handlers,
  ],
  exports: [
    database
  ],
})
export class CountryModule implements OnApplicationBootstrap {

  constructor(private readonly countryRepository: CountryRepository) { }

  async onApplicationBootstrap() {
    const countCountries = await this.countryRepository.count();
    if (countCountries === 0) {
      await this.countryRepository.save({
        name: 'Colombia',
        states: [{
          id: new ObjectID(),
          name: 'Antioquia',
          cities: [{
            id: new ObjectID(),
            name: 'Medellín'
          }]
        }]
      });

      await this.countryRepository.save({
        name: 'Ecuador',
        states: [{
          id: new ObjectID(),
          name: 'Pichincha',
          cities: [{
            id: new ObjectID(),
            name: 'Quito'
          }]
        }]
      });
    }
  }

}
