import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { ClientInfoStore } from '@redux/client-info/stores/client-info.store';
import { ClientInfoEffects } from '@redux/client-info/effects/client-info.effects';
import { ClientInfoRoutingModule } from './client-info-routing.module';
import { ClientInfoLayoutComponent } from './components/client-info-layout/client-info-layout.component';
import { ClientInfoActionService } from './services/client-info-action.service';
import { ClientInfoListComponent } from './components/client-info-list/client-info-list.component';
import { ClientInfoFormComponent } from './components/client-info-form/client-info-form.component';
import { ClientInfoFormModalComponent } from './components/client-info-form-modal/client-info-form-modal.component';
import { SharedModule } from '@shared/shared.module';
import { SharedFormsModule } from '@shared/shared-forms-module.module';
import { SharedModalModule } from '@shared/shared-modal-module.module';
import { SharedTablesModule } from '@shared/shared-tables-module.module';
import { CountrySelectModule } from '../controls/country-select/country-select.module';
import { StateSelectModule } from '../controls/state-select/state-select.module';
import { CitySelectModule } from '../controls/city-select/city-select.module';

@NgModule({
  declarations: [
    ClientInfoLayoutComponent,
    ClientInfoListComponent,
    ClientInfoFormComponent,
    ClientInfoFormModalComponent
  ],
  imports: [
    SharedModule,
    SharedFormsModule,
    SharedModalModule,
    SharedTablesModule,
    ClientInfoRoutingModule,
    CountrySelectModule,
    StateSelectModule,
    CitySelectModule,
    ReduxRegisterModule.forFeature('clientInfo', { store: ClientInfoStore }),
    EffectsModule.forFeature([ClientInfoEffects])
  ],
  providers: [
    ClientInfoActionService
  ]
})
export class ClientInfoModule { }
