import { createSelector } from '@ngrx/store';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { VisitStoreModel } from '../models/visit-store.model';
import { selectAll } from '../stores/visit.store';


export const selectVisitState = state => state.visit.store as VisitStoreModel;

export const selectAllVisits = createSelector(
    selectVisitState,
    selectAll
);

export const selectVisitLoading = createSelector(
    selectVisitState,
    state => state.loading
);

export const selectVisitTotal = createSelector(
    selectVisitState,
    state => state.total
);

export const selectVisitsPage = (page: PageQueryModel) => createSelector(
    selectAllVisits,
    visits => {
        const start = page.index * page.size;
        const end = start + page.size;
        return visits.slice(start, end);
    }
);

export const selectVisitLoadingAction = createSelector(
    selectVisitState,
    state => state.loadingAction
);

export const selectVisitActionState = createSelector(
    selectVisitState,
    state => state.ActionState
);
