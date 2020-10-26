import { createAction, props } from '@ngrx/store';
import { SellerDto } from '../models/seller-dto.model';
import { GetSellerDto } from '../models/get-seller-dto.model';

export enum SellerActionTypes {
  LoadSellers = '[Seller] Load Sellers',
  SellersLoaded = '[Seller] Sellers Loaded',
  SellerActionComplete = '[Seller] Seller Action Complete',
  SellerActionError = '[Seller] Seller Action Error',
  SellerClearStore = '[Seller] Seller Clear Store',
  CancelSellerRequest = '[Seller] Cancel Seller Request',
}

export const cancelSellerRequest = createAction(SellerActionTypes.CancelSellerRequest);

export const sellerClearStore = createAction(SellerActionTypes.SellerClearStore);

export const sellerActionError = createAction(SellerActionTypes.SellerActionError);

export const sellerActionComplete = createAction(SellerActionTypes.SellerActionComplete);

export const sellersLoaded = createAction(SellerActionTypes.SellersLoaded,
  props<{sellers: SellerDto[], total: number }>());

export const loadSellers = createAction(SellerActionTypes.LoadSellers, props<{ filter: GetSellerDto }>());
