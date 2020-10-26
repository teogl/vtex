import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Store, Action } from '@craftsjs/ngrx-action';
import { ActionType } from '@redux/shared/models/action-type.model';
import { VisitStoreModel } from '../models/visit-store.model';
import { VisitDto } from '../models/visit-dto.model';
import * as VisitActions from '../actions/visit.actions';

export const adapter: EntityAdapter<VisitDto> = createEntityAdapter<VisitDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<VisitStoreModel>(initialState)
export class VisitStore {

    @Action(VisitActions.loadVisits)
    loadVisits(state: VisitStoreModel) {
        return { ...state, loading: true };
    }

    @Action(VisitActions.cancelVisitRequest)
    cancelVisitRequest(state: VisitStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(VisitActions.visitsLoaded)
    visitsLoaded(state: VisitStoreModel, { visits, total }) {
        return adapter.upsertMany<VisitStoreModel>(visits, {
            ...state,
            loading: false,
            total: total
        });
    }

    @Action(VisitActions.createVisit)
    createVisit(state: VisitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(VisitActions.visitCreated)
    visitCreated(state: VisitStoreModel, { visit } ) {
        return adapter.addOne(visit, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(VisitActions.updateVisit)
    updateVisit(state: VisitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(VisitActions.visitUpdated)
    visitUpdated(state: VisitStoreModel, { visit }) {
        const updateVisit = {
            id: visit.id,
            changes: visit
        } as Update<VisitDto>;
        return adapter.updateOne(updateVisit, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(VisitActions.visitActionComplete)
    visitActionComplete(state: VisitStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(VisitActions.visitActionError)
    visitActionError(state: VisitStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(VisitActions.deleteVisit)
    deleteVisit(state: VisitStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(VisitActions.visitDeleted)
    visitDeleted(state: VisitStoreModel, { id }) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.delete,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(VisitActions.visitClearStore)
    userClearStore(state: VisitStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
