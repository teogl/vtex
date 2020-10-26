import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { VisitActionService } from '../../services/visit-action.service';
import { VisitDto } from '@redux/visit/models/visit-dto.model';
import * as VisitActions from '@redux/visit/actions/visit.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit-layout',
  templateUrl: './visit-layout.component.html',
  styleUrls: ['./visit-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisitLayoutComponent implements OnDestroy {

  clientInfoId: string;

  constructor(
    private _store: Store,
    private _visitActionService: VisitActionService,
    _activatedRouter: ActivatedRoute
  ) {
    this.clientInfoId = _activatedRouter.snapshot.paramMap.get('id');
  }

  createVisit() {
    this._visitActionService.openModalUpsert({ clientInfoId: this.clientInfoId } as VisitDto);
  }

  ngOnDestroy(): void {
    this._store.dispatch(VisitActions.visitClearStore());
  }

}
