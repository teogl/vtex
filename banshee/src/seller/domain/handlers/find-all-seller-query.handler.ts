import { QueryHandler, IQueryHandler } from '@addapptables/microservice';
import { SellerRepository } from '../../database/repositories/seller.repository';
import { FindAllSellerQuery } from '../../api/queries/find-all-seller.query';
import { transformIdToString } from '../../../utils/utils';

@QueryHandler(FindAllSellerQuery)
export class FindAllBankQueryHandler implements IQueryHandler<FindAllSellerQuery> {

  constructor(
    private readonly sellerRepository: SellerRepository
  ) { }

  handle(query: FindAllSellerQuery) {
    return this.sellerRepository.find(query.data)
    .then(transformIdToString as any);
  }

}
