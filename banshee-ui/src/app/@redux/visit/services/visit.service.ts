import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/shared/services/service-base';
import { GetVisitDto } from '../models/get-visit-dto.model';
import { VisitDto } from '../models/visit-dto.model';
import { CreateVisitDto } from '../models/create-visit-dto.model';
import { UpdateVisitDto } from '../models/update-visit-dto.model';

@Injectable({
  providedIn: 'root'
})
export class VisitService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/clients');
  }

  getAll(input: GetVisitDto) {
    return this.get<GetVisitDto, VisitDto[]>(`${input.clientInfoId}/visits`, input);
  }

  create(input: CreateVisitDto) {
    console.log(input.clientInfoId);
    return this.post<CreateVisitDto, VisitDto>(`${input.clientInfoId}/visits`, input);
  }

  patchVisit(input: UpdateVisitDto) {
    return this.patch<UpdateVisitDto, VisitDto>(`${input.clientInfoId}/visits/${input.id}`, input);
  }

  deleteVisit(id: string) {
    return this.delete(id);
  }

}
