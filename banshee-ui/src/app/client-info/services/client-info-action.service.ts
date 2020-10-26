import { Injectable, Injector } from '@angular/core';
import { ModalService } from '@craftsjs/modal';
import * as ClientInfoActions from '@redux/client-info/actions/client-info.actions';
import { selectClientInfoActionState } from '@redux/client-info/selectors/client-info.selector';
import { ClientInfoDto } from '@redux/client-info/models/client-info-dto.model';
import { ClientInfoFormModalComponent } from '../components/client-info-form-modal/client-info-form-modal.component';
import { ActionBaseService } from '@shared/services/action-base.service';

@Injectable()
export class ClientInfoActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, ClientInfoActions.clientInfoActionComplete(), selectClientInfoActionState);
  }

  openModalUpsert(clientInfo: ClientInfoDto) {
    this._modalService.show(ClientInfoFormModalComponent, clientInfo);
  }

  deleteClientInfo(clientInfo: ClientInfoDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('clientInfo.areYouSure', { title: clientInfo.nit }),
      ClientInfoActions.deleteClientInfo({ id: clientInfo.id })
    );
  }
}
