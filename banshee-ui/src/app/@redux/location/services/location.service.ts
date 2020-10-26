import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/shared/services/service-base';
import { GetLocationDto } from '../models/get-location-dto.model';
import { LocationDto } from '../models/location-dto.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/countries');
  }

  getAll(input: GetLocationDto) {
    return this.get<GetLocationDto, LocationDto[]>('', input);
  }

}
