import { Command } from '@addapptables/microservice';
import { DeleteClientDto } from '../dtos/delete-client.dto';

export class DeleteClientInfoCommand extends Command<DeleteClientDto> {
  public readonly action = 'delete-client-info';
  public readonly context = 'banshee';
}
