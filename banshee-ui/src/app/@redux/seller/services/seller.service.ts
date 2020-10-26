import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/shared/services/service-base';
import { GetSellerDto } from '../models/get-seller-dto.model';
import { SellerDto } from '../models/seller-dto.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/sellers');
  }

  getAll(input: GetSellerDto) {
    return this.get<GetSellerDto, SellerDto[]>('', input);
  }

}
