import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { ClientInfoRepository } from '../../database/repositories/client-info.repository';
import { DoesNotExistException } from '../../../core/exceptions/does-not-exist-exception';
import { isEmptyOrNil, throwErrorIfEmptyOrNil, throwErrorIfNotEmptyOrNil, transformSingleObjectToString } from '../../../utils/utils';
import { UpdateClientInfoCommand } from '../../api/commands/update-client-info.command';
import { ObjectId } from 'mongodb';
import { AlreadyExistException } from 'src/core/exceptions/already-exist-exception';
import { ClientInfoDomainService } from '../services/client-info.service';
import * as R from 'ramda';

@CommandHandler(UpdateClientInfoCommand)
export class UpdateClientInfoCommandHandler implements ICommandHandler<UpdateClientInfoCommand> {

  constructor(
    private readonly clientInfoRepository: ClientInfoRepository,
    private readonly clientInfoService: ClientInfoDomainService
  ) { }

  async handle(command: UpdateClientInfoCommand) {
    let data = command.data;
    const clientInfo = await this.clientInfoRepository.findOne({ where: { _id: new ObjectId(data.id) } })
      .then(throwErrorIfEmptyOrNil(new DoesNotExistException()));

    if (!isEmptyOrNil(command.data.nit) && command.data.nit !== clientInfo.nit) {
      await this.clientInfoRepository.findOne({ where: { nit: command.data.nit } })
        .then(throwErrorIfNotEmptyOrNil(new AlreadyExistException('Nit already exist')));
    }

    if (!isEmptyOrNil(data.countryId)) {
      const location = await this.clientInfoService.getLocation(data as any);
      data = {
        ...data,
        ...location
      } as any;
    }
    const updateData = R.reject(R.equals(undefined))(data) as any
    await this.clientInfoRepository.updateOne({ _id: new ObjectId(data.id) }, {
      $set: {
        ...R.omit(['id'], updateData)
      }
    });
    
    return transformSingleObjectToString({ ...clientInfo, ...updateData });
  }

}
