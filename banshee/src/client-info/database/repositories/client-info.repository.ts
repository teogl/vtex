import { EntityRepository, MongoRepository } from 'typeorm';
import { ClientInfo } from '../entities/client-info.entity';


@EntityRepository(ClientInfo)
export class ClientInfoRepository extends MongoRepository<ClientInfo> {}