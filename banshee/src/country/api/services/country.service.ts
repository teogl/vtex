import { Broker } from '@addapptables/microservice';
import { Injectable } from '@nestjs/common';
import { CountryDto } from '../dtos/country.dto';
import { FindAllQueryDto } from '../dtos/find-all-query.dto';
import { FindAllCountryQuery } from '../queries/find-all-country.query';
import * as R from 'ramda';
import { mapperCurry } from 'src/utils/mapper';

@Injectable()
export class CountryService {

  constructor(private readonly broker: Broker) { }

  findAll(query: FindAllQueryDto) {
    return this.broker.start()
      .add(new FindAllCountryQuery(query))
      .end<CountryDto[]>()
      .then(R.prop('data'))
      .then(mapperCurry(CountryDto));
  }

}
