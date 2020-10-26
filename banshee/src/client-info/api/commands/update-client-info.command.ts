import { Command } from '@addapptables/microservice';
import { UpdateClientInfoDto } from '../dtos/update-client-info.dto';

export class UpdateClientInfoCommand extends Command<UpdateClientInfoDto> {
  public readonly action = 'update-client-info';
  public readonly context = 'banshee';
}
