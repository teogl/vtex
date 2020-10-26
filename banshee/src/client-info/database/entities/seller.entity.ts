import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export class Seller {

  @ObjectIdColumn({ name: 'id' })
  id: ObjectID;

  @Column()
  name: string;

}
