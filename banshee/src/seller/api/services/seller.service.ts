import { Broker } from '@addapptables/microservice';
import { Injectable } from '@nestjs/common';
import * as R from 'ramda';
import { mapperCurry } from 'src/utils/mapper';
import { FindAllSellerQueryDto } from '../dtos/find-all-seller-query.dto';
import { FindAllSellerQuery } from '../queries/find-all-seller.query';
import { SellerDto } from '../dtos/seller.dto';

@Injectable()
export class SellerService {

  constructor(private readonly broker: Broker) { }

  findAll(query: FindAllSellerQueryDto) {
    return this.broker.start()
      .add(new FindAllSellerQuery(query))
      .end<SellerDto[]>()
      .then(R.prop('data'))
      .then(mapperCurry(SellerDto));
  }

}
