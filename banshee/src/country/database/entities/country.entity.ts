import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { State } from './state.entity';

@Entity()
export class Country {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column(() => State)
  states: State[];

}
