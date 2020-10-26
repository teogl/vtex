import { Query } from '@addapptables/microservice';
import { FindAllVisitQueryDto } from '../dtos/find-all-visit.dto';

export class FindAllVisitQuery extends Query<FindAllVisitQueryDto> {
  public readonly action = 'find-all-visit';
  public readonly context = 'banshee';
}
