import { createAction, props } from '@ngrx/store';
import { VisitDto } from '../models/visit-dto.model';
import { GetVisitDto } from '../models/get-visit-dto.model';
import { CreateVisitDto } from '../models/create-visit-dto.model';
import { UpdateVisitDto } from '../models/update-visit-dto.model';

export enum VisitActionTypes {
  LoadVisits = '[Visit] Load Visits',
  VisitsLoaded = '[Visit] Visits Loaded',
  CreateVisit = '[Visit] Create Visit',
  VisitCreated = '[Visit] Visit Created',
  UpdateVisit = '[Visit] Update Visit',
  VisitUpdated = '[Visit] Visit Updated',
  DeleteVisit = '[Visit] Delete Visit',
  VisitDeleted = '[Visit] Visit Deleted',
  VisitActionComplete = '[Visit] Visit Action Complete',
  VisitActionError = '[Visit] Visit Action Error',
  VisitClearStore = '[Visit] Visit Clear Store',
  CancelVisitRequest = '[Visit] Cancel Visit Request',
}

export const cancelVisitRequest = createAction(VisitActionTypes.CancelVisitRequest);

export const visitClearStore = createAction(VisitActionTypes.VisitClearStore);

export const visitActionError = createAction(VisitActionTypes.VisitActionError);

export const visitActionComplete = createAction(VisitActionTypes.VisitActionComplete);

export const visitDeleted = createAction(VisitActionTypes.VisitDeleted, props<{ id: string }>());

export const deleteVisit = createAction(VisitActionTypes.DeleteVisit, props<{ id: string }>());

export const visitUpdated = createAction(VisitActionTypes.VisitUpdated, props<{ visit: VisitDto }>());

export const updateVisit = createAction(VisitActionTypes.UpdateVisit, props<{ visit: UpdateVisitDto }>());

export const visitCreated = createAction(VisitActionTypes.VisitCreated, props<{ visit: VisitDto }>());

export const createVisit = createAction(VisitActionTypes.CreateVisit, props<{ visit: CreateVisitDto }>());

export const visitsLoaded = createAction(VisitActionTypes.VisitsLoaded,
  props<{visits: VisitDto[], total: number }>());

export const loadVisits = createAction(VisitActionTypes.LoadVisits, props<{ filter: GetVisitDto }>());
