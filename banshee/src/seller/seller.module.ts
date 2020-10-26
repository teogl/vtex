import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { getPrototypes } from '../utils/files';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerRepository } from './database/repositories/seller.repository';

const controllers = getPrototypes(
  `${__dirname}/api/controllers/*{.ts,.js}`,
);

const apiServices = getPrototypes(
  `${__dirname}/api/services/*{.ts,.js}`,
);

const handlers = getPrototypes(
  `${__dirname}/domain/handlers/*{.ts,.js}`,
);

const repositories = getPrototypes(
  `${__dirname}/database/repositories/*{.ts,.js}`,
);

const database = TypeOrmModule.forFeature([...repositories]);

@Module({
  imports: [
    database
  ],
  controllers: [...controllers],
  providers: [
    ...apiServices,
    ...handlers,
  ],
  exports: [
    database
  ],
})
export class SellerModule implements OnApplicationBootstrap {

  constructor(private readonly sellerRepository: SellerRepository) { }

  async onApplicationBootstrap() {
    const countSellers = await this.sellerRepository.count();
    if (countSellers === 0) {
      this.sellerRepository.save({
        name: 'Mateo'
      });
    }
  }

}
