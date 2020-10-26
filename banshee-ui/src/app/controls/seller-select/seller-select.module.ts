import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { EffectsModule } from '@ngrx/effects';
import { SellerEffects } from '@redux/seller/effects/seller.effects';
import { SellerStore } from '@redux/seller/stores/seller.store';
import { SharedModule } from '@shared/shared.module';
import { SellerSelectComponent } from './seller-select.component';

@NgModule({
  declarations: [
    SellerSelectComponent
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ReduxRegisterModule.forFeature('seller', { store: SellerStore }),
    EffectsModule.forFeature([SellerEffects])
  ],
  exports: [
    SellerSelectComponent
  ]
})
export class SellerSelectModule { }
