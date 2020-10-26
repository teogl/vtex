import { Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { Seller } from './seller.entity';

export class Visit {

  @ObjectIdColumn({ name: 'id' })
  id: ObjectID;

  @Column()
  date: Date;

  @Column(() => Seller)
  seller: Seller;

  @Column()
  total: number;

  @Column()
  totalVisit: number;

  @Column()
  description: string;
}
