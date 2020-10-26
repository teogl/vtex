import { Query } from '@addapptables/microservice';
import { FindAllClientInfoQueryDto } from '../dtos/find-all-client-info.dto';

export class FindAllClientInfoQuery extends Query<FindAllClientInfoQueryDto> {
  public readonly action = 'find-all-client-info';
  public readonly context = 'banshee';
}
