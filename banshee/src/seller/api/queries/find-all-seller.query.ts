import { Query } from '@addapptables/microservice';
import { FindAllSellerQueryDto } from '../dtos/find-all-seller-query.dto';

export class FindAllSellerQuery extends Query<FindAllSellerQueryDto> {
  public readonly action = 'find-all-seller';
  public readonly context = 'banshee';
}
