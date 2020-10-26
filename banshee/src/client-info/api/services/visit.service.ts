import { Broker } from '@addapptables/microservice';
import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from '../dtos/create-visit.dto';
import * as R from 'ramda';
import { CreateVisitCommand } from '../commands/create-visit.command';
import { mapperCurry } from 'src/utils/mapper';
import { VisitDto } from '../dtos/visit.dto';
import { UpdateVisitDto } from '../dtos/update-visit.dto';
import { Visit } from 'src/client-info/database/entities/visit.entity';
import { UpdateVisitCommand } from '../commands/update-visit.command';
import { FindAllVisitQueryDto } from '../dtos/find-all-visit.dto';
import { FindAllVisitQuery } from '../queries/find-all-visit.query';

@Injectable()
export class VisitService {

  constructor(private readonly broker: Broker) { }

  create(data: CreateVisitDto) {
    return this.broker.start()
      .add(new CreateVisitCommand(data))
      .end<Visit>()
      .then(R.prop('data'))
      .then(mapperCurry(VisitDto));
  }

  update(data: UpdateVisitDto) {
    return this.broker.start()
      .add(new UpdateVisitCommand(data))
      .end<Visit>()
      .then(R.prop('data'))
      .then(mapperCurry(VisitDto));
  }

  findAll(query: FindAllVisitQueryDto) {
    return this.broker.start()
      .add(new FindAllVisitQuery(query))
      .end<VisitDto[]>()
      .then(R.prop('data'))
      .then(mapperCurry(VisitDto));
  }

}
