import { EntityRepository, MongoRepository } from 'typeorm';
import { Seller } from '../entities/seller.entity';

@EntityRepository(Seller)
export class SellerRepository extends MongoRepository<Seller> {}