import { Column, ObjectID, ObjectIdColumn } from 'typeorm';

export class State {

  @ObjectIdColumn({ name: 'id' })
  id: ObjectID;

  @Column()
  name: string;
  
}
