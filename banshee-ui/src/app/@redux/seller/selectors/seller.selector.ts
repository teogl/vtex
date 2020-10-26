import { createSelector } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { SellerStoreModel } from '../models/seller-store.model';
import { selectAll } from '../stores/seller.store';


export const selectSellerState = state => state.seller.store as SellerStoreModel;

export const selectAllSellers = createSelector(
    selectSellerState,
    selectAll
);

export const selectSellerLoading = createSelector(
    selectSellerState,
    state => state.loading
);

export const selectSellerTotal = createSelector(
    selectSellerState,
    state => state.total
);

export const selectSellersPage = (page: PageQueryModel) => createSelector(
    selectAllSellers,
    sellers => {
        const start = page.index * page.size;
        const end = start + page.size;
        return sellers.slice(start, end);
    }
);

export const selectSellerLoadingAction = createSelector(
    selectSellerState,
    state => state.loadingAction
);

export const selectSellerActionState = createSelector(
    selectSellerState,
    state => state.ActionState
);
