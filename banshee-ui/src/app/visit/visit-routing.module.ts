import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitLayoutComponent } from './components/visit-layout/visit-layout.component';

const routes: Routes = [{
  path: 'clients/:id/visits',
  component: VisitLayoutComponent,
  data: { animation: 'VisitPage' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitRoutingModule { }
