import { Column, Entity, ObjectIdColumn } from 'typeorm';


@Entity()
export class Seller {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;
}
