import { createAction, props } from '@ngrx/store';
import { LocationDto } from '../models/location-dto.model';
import { GetLocationDto } from '../models/get-location-dto.model';

export enum LocationActionTypes {
  LoadLocations = '[Location] Load Locations',
  LocationsLoaded = '[Location] Locations Loaded',
  LocationActionComplete = '[Location] Location Action Complete',
  LocationActionError = '[Location] Location Action Error',
  LocationClearStore = '[Location] Location Clear Store',
  CancelLocationRequest = '[Location] Cancel Location Request',
}

export const cancelLocationRequest = createAction(LocationActionTypes.CancelLocationRequest);

export const locationClearStore = createAction(LocationActionTypes.LocationClearStore);

export const locationActionError = createAction(LocationActionTypes.LocationActionError);

export const locationActionComplete = createAction(LocationActionTypes.LocationActionComplete);

export const locationsLoaded = createAction(LocationActionTypes.LocationsLoaded,
  props<{locations: LocationDto[], total: number }>());

export const loadLocations = createAction(LocationActionTypes.LoadLocations, props<{ filter: GetLocationDto }>());
