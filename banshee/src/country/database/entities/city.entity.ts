import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export class City {
  @ObjectIdColumn({ name: 'id' })
  id: ObjectID;

  @Column()
  name: string;
}
