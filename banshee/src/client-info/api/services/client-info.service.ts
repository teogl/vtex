import { Broker } from '@addapptables/microservice';
import { Injectable } from '@nestjs/common';
import { CreateClientInfoCommand } from '../commands/create-client-info.command';
import { CreateClientInfoDto } from '../dtos/create-client-info.dto';
import * as R from 'ramda';
import { mapper, mapperCurry } from 'src/utils/mapper';
import { ClientInfoDto } from '../dtos/client-info.dto';
import { UpdateClientInfoDto } from '../dtos/update-client-info.dto';
import { UpdateClientInfoCommand } from '../commands/update-client-info.command';
import { FindAllClientInfoQueryDto } from '../dtos/find-all-client-info.dto';
import { FindAllClientInfoQuery } from '../queries/find-all-client-info.query';
import { PaginatedResultDto } from 'src/core/dtos/paginated-result.dto';
import { DeleteClientDto } from '../dtos/delete-client.dto';
import { DeleteClientInfoCommand } from '../commands/delete-client.command';

@Injectable()
export class ClientInfoService {

  constructor(private readonly broker: Broker) { }

  create(data: CreateClientInfoDto) {
    return this.broker.start()
      .add(new CreateClientInfoCommand(data))
      .end<CreateClientInfoDto>()
      .then(R.prop('data'))
      .then(mapperCurry(ClientInfoDto));
  }

  update(data: UpdateClientInfoDto) {
    return this.broker.start()
      .add(new UpdateClientInfoCommand(data))
      .end<ClientInfoDto>()
      .then(R.prop('data'))
      .then(mapperCurry(ClientInfoDto));
  }

  async delete(data: DeleteClientDto) {
    await this.broker.start()
      .add(new DeleteClientInfoCommand(data))
      .end<ClientInfoDto>();
    return { id: data.id };
  }

  findAll(query: FindAllClientInfoQueryDto) {
    return this.broker.start()
      .add(new FindAllClientInfoQuery(query))
      .end<PaginatedResultDto<ClientInfoDto>>()
      .then(R.prop('data'))
      .then((data) => {
        return {
          total: data.total,
          data: data.data.map(x => mapper(ClientInfoDto, x))
        }
      });
  }

}
