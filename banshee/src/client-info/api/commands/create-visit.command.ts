import { Command } from '@addapptables/microservice';
import { CreateVisitDto } from '../dtos/create-visit.dto';

export class CreateVisitCommand extends Command<CreateVisitDto> {
  public readonly action = 'create-visit';
  public readonly context = 'banshee';
}
