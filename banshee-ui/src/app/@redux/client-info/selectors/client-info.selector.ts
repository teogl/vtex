import { createSelector } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { ClientInfoStoreModel } from '../models/client-info-store.model';
import { selectAll } from '../stores/client-info.store';


export const selectClientInfoState = state => state.clientInfo.store as ClientInfoStoreModel;

export const selectAllClientInfos = createSelector(
    selectClientInfoState,
    selectAll
);

export const selectClientInfoLoading = createSelector(
    selectClientInfoState,
    state => state.loading
);

export const selectClientInfoTotal = createSelector(
    selectClientInfoState,
    state => state.total
);

export const selectClientInfosPage = (page: PageQueryModel) => createSelector(
    selectAllClientInfos,
    clientInfos => {
        const start = page.index * page.size;
        const end = start + page.size;
        return clientInfos.slice(start, end);
    }
);

export const selectClientInfoLoadingAction = createSelector(
    selectClientInfoState,
    state => state.loadingAction
);

export const selectClientInfoActionState = createSelector(
    selectClientInfoState,
    state => state.ActionState
);
