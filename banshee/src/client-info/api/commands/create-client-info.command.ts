import { Command } from '@addapptables/microservice';
import { CreateClientInfoDto } from '../dtos/create-client-info.dto';

export class CreateClientInfoCommand extends Command<CreateClientInfoDto> {
  public readonly action = 'create-client-info';
  public readonly context = 'banshee';
}
