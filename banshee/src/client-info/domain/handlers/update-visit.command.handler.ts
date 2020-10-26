import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { ClientInfoRepository } from '../../database/repositories/client-info.repository';
import { UpdateVisitCommand } from 'src/client-info/api/commands/update-visit.command';
import { ObjectId } from 'mongodb';
import { throwErrorIfEmptyOrNil, transformSingleObjectToString } from 'src/utils/utils';
import { DoesNotExistException } from 'src/core/exceptions/does-not-exist-exception';
import { SellerRepository } from 'src/seller/database/repositories/seller.repository';
import * as R from 'ramda';

@CommandHandler(UpdateVisitCommand)
export class UpdateVisitCommandHandler implements ICommandHandler<UpdateVisitCommand> {

  constructor(
    private readonly clientInfoRepository: ClientInfoRepository,
    private readonly sellerRepository: SellerRepository
  ) { }

  async handle(command: UpdateVisitCommand) {
    let data = command.data;
    const clientInfo = await this.clientInfoRepository.findOne({ where: { _id: new ObjectId(data.clientInfoId) } })
      .then(throwErrorIfEmptyOrNil(new DoesNotExistException('Client info does not exist')));
    if (data.total) {
      data = {
        ...data,
        totalVisit: (data.total * clientInfo.percentageVisits) / 100
      } as any
    }
    if (data.sellerId) {
      const seller = await this.sellerRepository.findOne({ where: { _id: new ObjectId(data.sellerId) } })
        .then(throwErrorIfEmptyOrNil(new DoesNotExistException('Seller does not exist')));
      data = {
        ...data,
        seller,
      } as any
    }
    
    const visit = clientInfo.visits.find(x => new ObjectId(x.id).toHexString() === data.id);
    const updateData = R.reject(R.equals(undefined))(data) as any
    await this.clientInfoRepository.updateOne({
      _id: new ObjectId(data.clientInfoId),
      'visits.id': new ObjectId(data.id)
    }, {
      $set: {
        'visits.$': { ...visit, ...R.omit(['clientInfoId', 'id'], updateData) }
      }
    })
    return transformSingleObjectToString({ ...visit, ...data });
  }

}
