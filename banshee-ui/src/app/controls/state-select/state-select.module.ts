import { NgModule } from '@angular/core';
import { StateSelectComponent } from './state-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    StateSelectComponent
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    StateSelectComponent
  ]
})
export class StateSelectModule { }
