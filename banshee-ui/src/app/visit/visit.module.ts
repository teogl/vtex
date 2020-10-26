import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { VisitStore } from '@redux/visit/stores/visit.store';
import { VisitEffects } from '@redux/visit/effects/visit.effects';
import { VisitRoutingModule } from './visit-routing.module';
import { VisitLayoutComponent } from './components/visit-layout/visit-layout.component';
import { VisitActionService } from './services/visit-action.service';
import { VisitListComponent } from './components/visit-list/visit-list.component';
import { VisitFormComponent } from './components/visit-form/visit-form.component';
import { VisitFormModalComponent } from './components/visit-form-modal/visit-form-modal.component';
import { SharedModule } from '@shared/shared.module';
import { SharedFormsModule } from '@shared/shared-forms-module.module';
import { SharedModalModule } from '@shared/shared-modal-module.module';
import { SharedTablesModule } from '@shared/shared-tables-module.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SellerSelectModule } from '../controls/seller-select/seller-select.module';

@NgModule({
  declarations: [
    VisitLayoutComponent,
    VisitListComponent,
    VisitFormComponent,
    VisitFormModalComponent
  ],
  imports: [
    SharedModule,
    SharedFormsModule,
    SharedModalModule,
    SharedTablesModule,
    VisitRoutingModule,
    SellerSelectModule,
    MatDatepickerModule,
    ReduxRegisterModule.forFeature('visit', { store: VisitStore }),
    EffectsModule.forFeature([VisitEffects])
  ],
  providers: [
    VisitActionService
  ]
})
export class VisitModule { }
