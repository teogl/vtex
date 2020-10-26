import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export class Country {

  @ObjectIdColumn({ name: 'id' })
  id: ObjectID;

  @Column()
  name: string;

}
