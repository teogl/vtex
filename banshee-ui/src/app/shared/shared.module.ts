import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from '@craftsjs/perfect-scrollbar';
import { CardModule } from '@craftsjs/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule,
    CardModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
