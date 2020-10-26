import { QueryHandler, IQueryHandler } from '@addapptables/microservice';
import { ObjectId } from 'mongodb';
import { FindAllVisitQuery } from 'src/client-info/api/queries/find-all-visit.query';
import { ClientInfoRepository } from 'src/client-info/database/repositories/client-info.repository';
import { throwErrorIfEmptyOrNil, transformIdToString, transformSingleObjectToString } from '../../../utils/utils';
import * as R from 'ramda';
import { DoesNotExistException } from 'src/core/exceptions/does-not-exist-exception';

const transformIds = R.map(
  R.evolve({
    seller: transformSingleObjectToString,
  })
)

@QueryHandler(FindAllVisitQuery)
export class FindAllVisitQueryHandler implements IQueryHandler<FindAllVisitQuery> {

  constructor(
    private readonly clientInfoRepository: ClientInfoRepository
  ) { }

  handle(query: FindAllVisitQuery) {
    return this.clientInfoRepository.findOne({ where: { _id: new ObjectId(query.data.clientInfoId) } })
      .then(throwErrorIfEmptyOrNil(new DoesNotExistException()))
      .then(R.prop('visits'))
      .then((data: []) => transformIdToString(data || []))
      .then(transformIds);
  }

}
