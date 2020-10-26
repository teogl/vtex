import { CommandHandler, ICommandHandler } from '@addapptables/microservice';
import { ClientInfoRepository } from '../../database/repositories/client-info.repository';
import { ObjectId } from 'mongodb';
import { DeleteClientInfoCommand } from 'src/client-info/api/commands/delete-client.command';


@CommandHandler(DeleteClientInfoCommand)
export class DeleteClientInfoCommandHandler implements ICommandHandler<DeleteClientInfoCommand> {

  constructor(
    private readonly clientInfoRepository: ClientInfoRepository,
  ) { }

  handle(command: DeleteClientInfoCommand) {
    return this.clientInfoRepository.deleteOne({_id: new ObjectId(command.data.id)});
  }
}
