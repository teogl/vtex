import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { ClientInfoRepository } from '../../database/repositories/client-info.repository';
import { CreateVisitCommand } from 'src/client-info/api/commands/create-visit.command';
import { ObjectId } from 'mongodb';
import * as R from 'ramda';
import { objectToString, throwErrorIfEmptyOrNil } from 'src/utils/utils';
import { DoesNotExistException } from 'src/core/exceptions/does-not-exist-exception';
import { SellerRepository } from 'src/seller/database/repositories/seller.repository';

const transformIds = R.evolve({
  id: objectToString,
  seller: R.evolve({
    id: objectToString,
  })
});

@CommandHandler(CreateVisitCommand)
export class CreateVisitCommandHandler implements ICommandHandler<CreateVisitCommand> {

  constructor(
    private readonly clientInfoRepository: ClientInfoRepository,
    private readonly sellerRepository: SellerRepository
  ) { }

  async handle(command: CreateVisitCommand) {
    let data = command.data;
    const clientInfo = await this.clientInfoRepository.findOne({ where: { _id: new ObjectId(data.clientInfoId) } })
      .then(throwErrorIfEmptyOrNil(new DoesNotExistException('Client info does not exist')));

    const seller = await this.sellerRepository.findOne({ where: { _id: new ObjectId(data.sellerId) } })
      .then(throwErrorIfEmptyOrNil(new DoesNotExistException('Seller does not exist')));

    data = {
      ...data,
      id: new ObjectId(),
      seller,
      totalVisit: (data.total * clientInfo.percentageVisits) / 100
    } as any

    await this.clientInfoRepository.updateOne({ _id: new ObjectId(data.clientInfoId) }, {
      $inc: {
        space: -1
      },
      $addToSet: {
        visits: { ...R.omit(['clientInfoId'], data) }
      }
    })
    return transformIds(data as any);
  }
}
