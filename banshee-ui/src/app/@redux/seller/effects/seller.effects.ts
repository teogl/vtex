import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SellerService } from '../services/seller.service';
import { switchMap, takeUntil, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { SellerDto } from '../models/seller-dto.model';
import * as SellerActions from '../actions/seller.actions';

@Injectable()
export class SellerEffects {

  constructor(
    private _actions$: Actions,
    private _sellerService: SellerService
  ) { }

  loadData$ = createEffect(() => this._actions$.pipe(
    ofType(SellerActions.loadSellers),
    switchMap((action) =>
      this._sellerService.getAll(action.filter).pipe(
        takeUntil(this._actions$.pipe(ofType(SellerActions.cancelSellerRequest))),
        catchError(() => of([] as SellerDto[]))
      )
    ),
    map((result) => SellerActions.sellersLoaded({ sellers: result, total: result.length }))
  ));

}
