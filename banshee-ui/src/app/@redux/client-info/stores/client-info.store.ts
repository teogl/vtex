import { EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Store, Action } from '@craftsjs/ngrx-action';
import { ActionType } from '@redux/shared/models/action-type.model';
import { ClientInfoStoreModel } from '../models/client-info-store.model';
import { ClientInfoDto } from '../models/client-info-dto.model';
import * as ClientInfoActions from '../actions/client-info.actions';

export const adapter: EntityAdapter<ClientInfoDto> = createEntityAdapter<ClientInfoDto>();

const initialState = adapter.getInitialState({
    loading: false,
    loadingAction: false,
    ActionState: ActionType.none,
    total: 0
});

@Store<ClientInfoStoreModel>(initialState)
export class ClientInfoStore {

    @Action(ClientInfoActions.loadClientInfos)
    loadClientInfos(state: ClientInfoStoreModel) {
        return { ...state, loading: true };
    }

    @Action(ClientInfoActions.cancelClientInfoRequest)
    cancelClientInfoRequest(state: ClientInfoStoreModel) {
        return { ...state, loading: false, loadingAction: false };
    }

    @Action(ClientInfoActions.clientInfosLoaded)
    clientInfosLoaded(state: ClientInfoStoreModel, { clientInfos, total }) {
        return adapter.upsertMany<ClientInfoStoreModel>(clientInfos, {
            ...state,
            loading: false,
            total: total
        });
    }

    @Action(ClientInfoActions.createClientInfo)
    createClientInfo(state: ClientInfoStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(ClientInfoActions.clientInfoCreated)
    clientInfoCreated(state: ClientInfoStoreModel, { clientInfo } ) {
        return adapter.addOne(clientInfo, {
            ...state,
            total: state.total + 1,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(ClientInfoActions.updateClientInfo)
    updateClientInfo(state: ClientInfoStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(ClientInfoActions.clientInfoUpdated)
    clientInfoUpdated(state: ClientInfoStoreModel, { clientInfo }) {
        const updateClientInfo = {
            id: clientInfo.id,
            changes: clientInfo
        } as Update<ClientInfoDto>;
        return adapter.updateOne(updateClientInfo, {
            ...state,
            loadingAction: false,
            ActionState: ActionType.success
        });
    }

    @Action(ClientInfoActions.clientInfoActionComplete)
    clientInfoActionComplete(state: ClientInfoStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(ClientInfoActions.clientInfoActionError)
    clientInfoActionError(state: ClientInfoStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(ClientInfoActions.deleteClientInfo)
    deleteClientInfo(state: ClientInfoStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(ClientInfoActions.clientInfoDeleted)
    clientInfoDeleted(state: ClientInfoStoreModel, { id }) {
        return adapter.removeOne(id, {
            ...state,
            ActionState: ActionType.delete,
            loadingAction: false,
            total: state.total - 1,
        });
    }

    @Action(ClientInfoActions.clientInfoClearStore)
    userClearStore(state: ClientInfoStoreModel) {
        return adapter.removeAll({ ...state, total: 0 });
    }
}

export const {
    selectAll
} = adapter.getSelectors();
