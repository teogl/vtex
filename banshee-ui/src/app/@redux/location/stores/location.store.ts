import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Store, Action } from '@craftsjs/ngrx-action';
import { ActionType } from '@redux/shared/models/action-type.model';
import { LocationStoreModel } from '../models/location-store.model';
import { LocationDto } from '../models/location-dto.model';
import * as LocationActions from '../actions/location.actions';;

export const adapter: EntityAdapter<LocationDto> = createEntityAdapter<LocationDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<LocationStoreModel>(initialState)
export class LocationStore {

    @Action(LocationActions.loadLocations)
    loadLocations(state: LocationStoreModel) {
        return { ...state, loading: true };
    }

    @Action(LocationActions.cancelLocationRequest)
    cancelLocationRequest(state: LocationStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(LocationActions.locationsLoaded)
    locationsLoaded(state: LocationStoreModel, { locations, total }) {
        return adapter.upsertMany<LocationStoreModel>(locations, {
            ...state,
            loading: false,
            total: total
        });
    }

    @Action(LocationActions.locationActionComplete)
    locationActionComplete(state: LocationStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(LocationActions.locationActionError)
    locationActionError(state: LocationStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(LocationActions.locationClearStore)
    userClearStore(state: LocationStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
