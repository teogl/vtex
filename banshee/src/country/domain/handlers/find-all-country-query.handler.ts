import { QueryHandler, IQueryHandler } from '@addapptables/microservice';
import { CountryRepository } from '../../../country/database/repositories/country.repository';
import { FindAllCountryQuery } from '../../api/queries/find-all-country.query';
import * as R from 'ramda';
import { objectToString } from 'src/utils/utils';

const transformIds = R.map(
  R.evolve({
    id: objectToString,
    states: R.map(
      R.evolve({
        id: objectToString,
        cities: R.map(
          R.evolve({
            id: objectToString
          })
        )
      }))
  })
)

@QueryHandler(FindAllCountryQuery)
export class FindAllCountryQueryHandler implements IQueryHandler<FindAllCountryQuery> {

  constructor(
    private readonly countryRepository: CountryRepository
  ) { }

  async handle(query: FindAllCountryQuery) {
    return this.countryRepository.find(query.data)
      .then(transformIds);
  }

}
