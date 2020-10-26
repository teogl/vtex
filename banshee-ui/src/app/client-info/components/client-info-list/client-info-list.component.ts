import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetClientInfoDto } from '@redux/client-info/models/get-client-info-dto.model';
import { ClientInfoDto } from '@redux/client-info/models/client-info-dto.model';
import { ClientInfoDataSourceService } from '../../services/client-info-data-source.service';
import { ClientInfoActionService } from '../../services/client-info-action.service';
import { ListComponentBase } from '@shared/list/list-component-base';

@Component({
  selector: 'app-client-info-list',
  templateUrl: './client-info-list.component.html',
  styleUrls: ['./client-info-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ClientInfoDataSourceService,
    ClientInfoActionService
  ]
})
export class ClientInfoListComponent extends ListComponentBase<GetClientInfoDto> implements OnInit {

  constructor(
    clientInfoDataSourceService: ClientInfoDataSourceService,
    private _clientInfoActionService: ClientInfoActionService
  ) {
    super(clientInfoDataSourceService);
  }

  editClientInfo(clientInfo: ClientInfoDto) {
    this._clientInfoActionService.openModalUpsert(clientInfo);
  }

  deleteClientInfo(clientInfo: ClientInfoDto) {
    this._clientInfoActionService.deleteClientInfo(clientInfo);
  }

}
