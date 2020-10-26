import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { City } from './city.entity';
import { Country } from './country.entity';
import { State } from './state.entity';
import { Visit } from './visit.entity';

@Entity()
export class ClientInfo {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  nit: string;

  @Column()
  fullName: string;

  @Column()
  address?: string;

  @Column()
  phone?: string;

  @Column(() => City)
  city: City;

  @Column(() => State)
  state: State;

  @Column(() => Country)
  country: Country;

  @Column()
  space: number;

  @Column()
  spaceBalance: number;

  @Column()
  percentageVisits: number;

  @Column(() => Visit)
  visits: Visit[];


}