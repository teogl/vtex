import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientInfoActionService } from '../../services/client-info-action.service';
import { ClientInfoDto } from '@redux/client-info/models/client-info-dto.model';
import * as ClientInfoActions from '@redux/client-info/actions/client-info.actions';

@Component({
  selector: 'app-client-info-layout',
  templateUrl: './client-info-layout.component.html',
  styleUrls: ['./client-info-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientInfoLayoutComponent implements OnDestroy {

  constructor(
    private _store: Store,
    private _clientInfoActionService: ClientInfoActionService
  ) { }

  createClientInfo() {
    this._clientInfoActionService.openModalUpsert({} as ClientInfoDto);
  }

  ngOnDestroy(): void {
    this._store.dispatch(ClientInfoActions.clientInfoClearStore());
  }

}
