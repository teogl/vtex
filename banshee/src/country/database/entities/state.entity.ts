import { Column, ObjectID, ObjectIdColumn } from 'typeorm';
import { City } from './city.entity';

export class State {

  @ObjectIdColumn({ name: 'id' })
  id: ObjectID;

  @Column()
  name: string;

  @Column(() => City)
  cities: City[];
}
