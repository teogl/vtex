import { createSelector } from '@ngrx/store';
import { LocationStoreModel } from '../models/location-store.model';
import { selectAll } from '../stores/location.store';


export const selectLocationState = state => state.location.store as LocationStoreModel;

export const selectAllLocations = createSelector(
    selectLocationState,
    selectAll
);

export const selectAllStates = (countryId: string) => createSelector(
    selectAllLocations,
    state => state.filter(x=> x.id === countryId).map(x=> x.states).reduce((a, b) => a.concat(b), [])
);

export const selectAllCities = (countryId: string, stateId: string) => createSelector(
    selectAllStates(countryId),
    state => state.filter(x=> x.id === stateId).map(x=> x.cities).reduce((a, b) => a.concat(b), [])
);

export const selectLocationLoading = createSelector(
    selectLocationState,
    state => state.loading
);

export const selectLocationTotal = createSelector(
    selectLocationState,
    state => state.total
);

export const selectLocationLoadingAction = createSelector(
    selectLocationState,
    state => state.loadingAction
);
