import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GetVisitDto } from '@redux/visit/models/get-visit-dto.model';
import { VisitDto } from '@redux/visit/models/visit-dto.model';
import { VisitDataSourceService } from '../../services/visit-data-source.service';
import { VisitActionService } from '../../services/visit-action.service';
import { ListComponentBase } from '@shared/list/list-component-base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    VisitDataSourceService,
    VisitActionService
  ]
})
export class VisitListComponent extends ListComponentBase<GetVisitDto> implements OnInit {

  clientInfoId: string;

  constructor(
    visitDataSourceService: VisitDataSourceService,
    private _visitActionService: VisitActionService,
    _activatedRouter: ActivatedRoute
  ) {
    super(visitDataSourceService);
    this.clientInfoId = _activatedRouter.snapshot.paramMap.get('id');
    this.filter.next({ clientInfoId: this.clientInfoId });
  }

  editVisit(visit: VisitDto) {
    this._visitActionService.openModalUpsert({...visit, clientInfoId: this.clientInfoId});
  }

  deleteVisit(visit: VisitDto) {
    this._visitActionService.deleteVisit(visit);
  }

}
