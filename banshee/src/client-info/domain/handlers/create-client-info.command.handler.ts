import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { ClientInfoRepository } from '../../database/repositories/client-info.repository';
import { isEmptyOrNil, throwErrorIfNotEmptyOrNil, transformSingleObjectToString } from '../../../utils/utils';
import { CreateClientInfoCommand } from '../../api/commands/create-client-info.command';
import { AlreadyExistException } from 'src/core/exceptions/already-exist-exception';
import { ClientInfoDomainService } from '../services/client-info.service';

@CommandHandler(CreateClientInfoCommand)
export class CreateClientInfoCommandHandler implements ICommandHandler<CreateClientInfoCommand> {

  constructor(
    private readonly clientInfoRepository: ClientInfoRepository,
    private readonly clientInfoService: ClientInfoDomainService
  ) { }

  async handle(command: CreateClientInfoCommand) {
    let data = command.data;
    await this.clientInfoRepository.findOne({ where: { nit: command.data.nit } })
    .then(throwErrorIfNotEmptyOrNil(new AlreadyExistException('Nit already exist')));
    if (!isEmptyOrNil(data.countryId)) {
      const location = await this.clientInfoService.getLocation(data as any);
      data = {
        ...data,
        ...location
      } as any;
    }
    return this.clientInfoRepository.save(data)
    .then(transformSingleObjectToString);
  }

}
