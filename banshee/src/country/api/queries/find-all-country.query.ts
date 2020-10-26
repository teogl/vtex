import { Query } from '@addapptables/microservice';
import { FindAllQueryDto } from '../dtos/find-all-query.dto';

export class FindAllCountryQuery extends Query<FindAllQueryDto> {
  public readonly action = 'find-all-country';
  public readonly context = 'banshee';
}
