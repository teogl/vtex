import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@shared/shared.module';
import { CitySelectComponent } from './city-select.component';

@NgModule({
  declarations: [
    CitySelectComponent
  ],
  imports: [
    SharedModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    CitySelectComponent
  ]
})
export class CitySelectModule { }
