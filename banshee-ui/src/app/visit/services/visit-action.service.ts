import { Injectable, Injector } from '@angular/core';
import { ModalService } from '@craftsjs/modal';
import * as VisitActions from '@redux/visit/actions/visit.actions';
import { selectVisitActionState } from '@redux/visit/selectors/visit.selector';
import { VisitDto } from '@redux/visit/models/visit-dto.model';
import { VisitFormModalComponent } from '../components/visit-form-modal/visit-form-modal.component';
import { ActionBaseService } from '@shared/services/action-base.service';

@Injectable()
export class VisitActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, VisitActions.visitActionComplete(), selectVisitActionState);
  }

  openModalUpsert(visit: VisitDto) {
    this._modalService.show(VisitFormModalComponent, visit);
  }

  deleteVisit(visit: VisitDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('visit.areYouSure', { title: visit.date }),
      VisitActions.deleteVisit({ id: visit.id })
    );
  }
}
