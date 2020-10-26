import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VisitService } from '../services/visit.service';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { VisitDto } from '../models/visit-dto.model';
import * as VisitActions from '../actions/visit.actions';

@Injectable()
export class VisitEffects {

  constructor(
    private _actions$: Actions,
    private _visitService: VisitService
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(VisitActions.loadVisits),
    switchMap((action) =>
      this._visitService.getAll(action.filter).pipe(
        takeUntil(this._actions$.pipe(ofType(VisitActions.cancelVisitRequest))),
        catchError(() => of([] as VisitDto[]))
      )
    ),
    map((result) => VisitActions.visitsLoaded({ visits: result, total: result.length }))
  ));

  $create = createEffect(() => this._actions$.pipe(
    ofType(VisitActions.createVisit),
    switchMap((action) =>
      this._visitService.create(action.visit).pipe(
        takeUntil(this._actions$.pipe(ofType(VisitActions.cancelVisitRequest))),
        map((visit) => VisitActions.visitCreated({ visit })),
        catchError(() => of(VisitActions.visitActionError()))
      )
    )
  ));

  $update = createEffect(() => this._actions$.pipe(
    ofType(VisitActions.updateVisit),
    switchMap((action) =>
      this._visitService.patchVisit(action.visit).pipe(
        takeUntil(this._actions$.pipe(ofType(VisitActions.cancelVisitRequest))),
        map((visit) => VisitActions.visitUpdated({ visit })),
        catchError(() => of(VisitActions.visitActionError()))
      )
    )
  ));

  $delete = createEffect(() => this._actions$.pipe(
    ofType(VisitActions.deleteVisit),
    switchMap((action) =>
      this._visitService.deleteVisit(action.id).pipe(
        takeUntil(this._actions$.pipe(ofType(VisitActions.cancelVisitRequest))),
        map(() => VisitActions.visitDeleted({ id: action.id })),
        catchError(() => of(VisitActions.visitActionError()))
      )
    )
  ));

}
