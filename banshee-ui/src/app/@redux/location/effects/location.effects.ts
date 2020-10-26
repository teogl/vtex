import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocationService } from '../services/location.service';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as LocationActions from '../actions/location.actions';

@Injectable()
export class LocationEffects {

  constructor(
    private _actions$: Actions,
    private _locationService: LocationService
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(LocationActions.loadLocations),
    switchMap((action) =>
      this._locationService.getAll(action.filter).pipe(
        takeUntil(this._actions$.pipe(ofType(LocationActions.cancelLocationRequest))),
        catchError(() => of([]))
      )
    ),
    map((result) => LocationActions.locationsLoaded({ locations: result, total: result.length }))
  ));

}
