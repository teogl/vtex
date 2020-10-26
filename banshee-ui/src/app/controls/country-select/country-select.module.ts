import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@shared/shared.module';
import { LocationStore } from '@redux/location/stores/location.store';
import { LocationEffects } from '@redux/location/effects/location.effects';
import { CountrySelectComponent } from './country-select.component';

@NgModule({
  declarations: [
    CountrySelectComponent
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    ReduxRegisterModule.forFeature('location', { store: LocationStore }),
    EffectsModule.forFeature([LocationEffects])
  ],
  exports: [
    CountrySelectComponent
  ]
})
export class CountrySelectModule { }
