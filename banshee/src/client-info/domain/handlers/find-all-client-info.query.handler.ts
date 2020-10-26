import { QueryHandler, IQueryHandler } from '@addapptables/microservice';
import { FindAllClientInfoQuery } from 'src/client-info/api/queries/find-all-client-info.query';
import { ClientInfoRepository } from 'src/client-info/database/repositories/client-info.repository';
import { toPaginationResponse, transformSingleObjectToString } from '../../../utils/utils';
import * as R from 'ramda';

const transformIds = R.map(
  R.evolve({
    country: transformSingleObjectToString,
    state: transformSingleObjectToString,
    city: transformSingleObjectToString
  })
)

@QueryHandler(FindAllClientInfoQuery)
export class FindAllClientInfoQueryHandler implements IQueryHandler<FindAllClientInfoQuery> {

  constructor(
    private readonly clientInfoRepository: ClientInfoRepository
  ) { }

  handle(query: FindAllClientInfoQuery) {
    return this.clientInfoRepository.findAndCount({ skip: query.data?.skip || 0, take: query.data?.take || 10 })
      .then(toPaginationResponse)
      .then(data => ({
        total: data.total,
        data: transformIds(data.data)
      }));
  }

}
