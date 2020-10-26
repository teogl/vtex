import { Injectable, Injector } from '@angular/core';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { ServiceApiBase } from '@redux/shared/services/service-base';
import { GetClientInfoDto } from '../models/get-client-info-dto.model';
import { ClientInfoDto } from '../models/client-info-dto.model';
import { CreateClientInfoDto } from '../models/create-client-info-dto.model';
import { UpdateClientInfoDto } from '../models/update-client-info-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/clients');
  }

  getAll(input: GetClientInfoDto) {
    return this.get<GetClientInfoDto, PaginatedModel<ClientInfoDto>>('', input);
  }

  create(input: CreateClientInfoDto) {
    return this.post<CreateClientInfoDto, ClientInfoDto>('', input);
  }

  update(input: UpdateClientInfoDto) {
    return this.put<UpdateClientInfoDto, ClientInfoDto>('', input);
  }

  patchClientInfo(input: UpdateClientInfoDto) {
    return this.patch<UpdateClientInfoDto, ClientInfoDto>(input.id, input);
  }

  deleteClientInfo(id: string) {
    return this.delete(id);
  }

}
