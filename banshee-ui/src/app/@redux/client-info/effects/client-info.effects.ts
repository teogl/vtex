import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientInfoService } from '../services/client-info.service';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { ClientInfoDto } from '../models/client-info-dto.model';
import * as ClientInfoActions from '../actions/client-info.actions';

@Injectable()
export class ClientInfoEffects {

  constructor(
    private _actions$: Actions,
    private _clientInfoService: ClientInfoService
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(ClientInfoActions.loadClientInfos),
    switchMap((action) =>
      this._clientInfoService.getAll(action.filter).pipe(
        takeUntil(this._actions$.pipe(ofType(ClientInfoActions.cancelClientInfoRequest))),
        catchError(() => of({ total: 0, data: [] } as PaginatedModel<ClientInfoDto>))
      )
    ),
    map((result) => ClientInfoActions.clientInfosLoaded({ clientInfos: result.data, total: result.total }))
  ));

  $create = createEffect(() => this._actions$.pipe(
    ofType(ClientInfoActions.createClientInfo),
    switchMap((action) =>
      this._clientInfoService.create(action.clientInfo).pipe(
        takeUntil(this._actions$.pipe(ofType(ClientInfoActions.cancelClientInfoRequest))),
        map((clientInfo) => ClientInfoActions.clientInfoCreated({ clientInfo })),
        catchError(() => of(ClientInfoActions.clientInfoActionError()))
      )
    )
  ));

  $update = createEffect(() => this._actions$.pipe(
    ofType(ClientInfoActions.updateClientInfo),
    switchMap((action) =>
      this._clientInfoService.patchClientInfo(action.clientInfo).pipe(
        takeUntil(this._actions$.pipe(ofType(ClientInfoActions.cancelClientInfoRequest))),
        map((clientInfo) => ClientInfoActions.clientInfoUpdated({ clientInfo })),
        catchError(() => of(ClientInfoActions.clientInfoActionError()))
      )
    )
  ));

  $delete = createEffect(() => this._actions$.pipe(
    ofType(ClientInfoActions.deleteClientInfo),
    switchMap((action) =>
      this._clientInfoService.deleteClientInfo(action.id).pipe(
        takeUntil(this._actions$.pipe(ofType(ClientInfoActions.cancelClientInfoRequest))),
        map(() => ClientInfoActions.clientInfoDeleted({ id: action.id })),
        catchError(() => of(ClientInfoActions.clientInfoActionError()))
      )
    )
  ));

}
