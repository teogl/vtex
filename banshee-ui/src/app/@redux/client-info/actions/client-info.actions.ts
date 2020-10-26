import { createAction, props } from '@ngrx/store';
import { ClientInfoDto } from '../models/client-info-dto.model';
import { GetClientInfoDto } from '../models/get-client-info-dto.model';
import { CreateClientInfoDto } from '../models/create-client-info-dto.model';
import { UpdateClientInfoDto } from '../models/update-client-info-dto.model';

export enum ClientInfoActionTypes {
  LoadClientInfos = '[ClientInfo] Load ClientInfos',
  ClientInfosLoaded = '[ClientInfo] ClientInfos Loaded',
  CreateClientInfo = '[ClientInfo] Create ClientInfo',
  ClientInfoCreated = '[ClientInfo] ClientInfo Created',
  UpdateClientInfo = '[ClientInfo] Update ClientInfo',
  ClientInfoUpdated = '[ClientInfo] ClientInfo Updated',
  DeleteClientInfo = '[ClientInfo] Delete ClientInfo',
  ClientInfoDeleted = '[ClientInfo] ClientInfo Deleted',
  ClientInfoActionComplete = '[ClientInfo] ClientInfo Action Complete',
  ClientInfoActionError = '[ClientInfo] ClientInfo Action Error',
  ClientInfoClearStore = '[ClientInfo] ClientInfo Clear Store',
  CancelClientInfoRequest = '[ClientInfo] Cancel ClientInfo Request',
}

export const cancelClientInfoRequest = createAction(ClientInfoActionTypes.CancelClientInfoRequest);

export const clientInfoClearStore = createAction(ClientInfoActionTypes.ClientInfoClearStore);

export const clientInfoActionError = createAction(ClientInfoActionTypes.ClientInfoActionError);

export const clientInfoActionComplete = createAction(ClientInfoActionTypes.ClientInfoActionComplete);

export const clientInfoDeleted = createAction(ClientInfoActionTypes.ClientInfoDeleted, props<{ id: string }>());

export const deleteClientInfo = createAction(ClientInfoActionTypes.DeleteClientInfo, props<{ id: string }>());

export const clientInfoUpdated = createAction(ClientInfoActionTypes.ClientInfoUpdated, props<{ clientInfo: ClientInfoDto }>());

export const updateClientInfo = createAction(ClientInfoActionTypes.UpdateClientInfo, props<{ clientInfo: UpdateClientInfoDto }>());

export const clientInfoCreated = createAction(ClientInfoActionTypes.ClientInfoCreated, props<{ clientInfo: ClientInfoDto }>());

export const createClientInfo = createAction(ClientInfoActionTypes.CreateClientInfo, props<{ clientInfo: CreateClientInfoDto }>());

export const clientInfosLoaded = createAction(ClientInfoActionTypes.ClientInfosLoaded,
  props<{clientInfos: ClientInfoDto[], total: number }>());

export const loadClientInfos = createAction(ClientInfoActionTypes.LoadClientInfos, props<{ filter: GetClientInfoDto }>());
