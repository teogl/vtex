import { EntityRepository, MongoRepository } from 'typeorm';
import { Country } from '../entities/country.entity';

@EntityRepository(Country)
export class CountryRepository extends MongoRepository<Country> {}