import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Store, Action } from '@craftsjs/ngrx-action';
import { ActionType } from '@redux/shared/models/action-type.model';
import { SellerStoreModel } from '../models/seller-store.model';
import { SellerDto } from '../models/seller-dto.model';
import * as SellerActions from '../actions/seller.actions';;

export const adapter: EntityAdapter<SellerDto> = createEntityAdapter<SellerDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<SellerStoreModel>(initialState)
export class SellerStore {

    @Action(SellerActions.loadSellers)
    loadSellers(state: SellerStoreModel) {
        return { ...state, loading: true };
    }

    @Action(SellerActions.cancelSellerRequest)
    cancelSellerRequest(state: SellerStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(SellerActions.sellersLoaded)
    sellersLoaded(state: SellerStoreModel, { sellers, total }) {
        return adapter.upsertMany<SellerStoreModel>(sellers, {
            ...state,
            loading: false,
            total: total
        });
    }

    @Action(SellerActions.sellerActionComplete)
    sellerActionComplete(state: SellerStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(SellerActions.sellerActionError)
    sellerActionError(state: SellerStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(SellerActions.sellerClearStore)
    userClearStore(state: SellerStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
