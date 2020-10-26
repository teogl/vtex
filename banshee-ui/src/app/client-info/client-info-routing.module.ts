import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientInfoLayoutComponent } from './components/client-info-layout/client-info-layout.component';

const routes: Routes = [{
  path: 'clients',
  component: ClientInfoLayoutComponent,
  data: { animation: 'ClientPage' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientInfoRoutingModule { }
