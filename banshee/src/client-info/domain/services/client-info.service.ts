import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { throwErrorIfEmptyOrNil } from '../../../utils/utils';
import { DoesNotExistException } from '../../../core/exceptions/does-not-exist-exception';
import { CountryRepository } from '../../../country/database/repositories/country.repository';
import * as R from 'ramda';

@Injectable()
export class ClientInfoDomainService {

  constructor(private readonly countryRepository: CountryRepository) { }

  async getLocation({ countryId, stateId, cityId }: { countryId: string, stateId: string, cityId: string }) {
    const country = await this.countryRepository.findOne({ where: { _id: new ObjectId(countryId) } })
      .then(throwErrorIfEmptyOrNil(new DoesNotExistException('The country does not exist.')));
    const state = country.states?.find(state => new ObjectId(state.id).toHexString() === stateId);
    const city = state?.cities?.find(city => new ObjectId(city.id).toHexString() === cityId);
    const getProperties = R.pick(['id', 'name']);
    return {
      city,
      state: getProperties(state),
      country: getProperties(country)
    };
  }

}