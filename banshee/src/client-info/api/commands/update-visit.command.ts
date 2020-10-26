import { Command } from '@addapptables/microservice';
import { UpdateVisitDto } from '../dtos/update-visit.dto';

export class UpdateVisitCommand extends Command<UpdateVisitDto> {
  public readonly action = 'update-visit';
  public readonly context = 'banshee';
}
