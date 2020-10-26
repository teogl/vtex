import { Component, OnInit, ChangeDetectionStrategy, Injector, Input } from '@angular/core';
import { selectVisitActionState, selectVisitLoadingAction } from '@redux/visit/selectors/visit.selector';
import * as VisitActions from '@redux/visit/actions/visit.actions';
import { FormGroup, Validators } from '@angular/forms';
import { VisitDto } from '@redux/visit/models/visit-dto.model';
import { FormBase } from '@shared/forms/form-base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisitFormComponent extends FormBase implements OnInit {

  formGroup: FormGroup;

  @Input()
  visitDto: VisitDto;

  constructor(
    injector: Injector,
    private readonly _activatedRouter: ActivatedRoute,
  ) {
    super(injector, selectVisitLoadingAction, selectVisitActionState, VisitActions.visitActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      id: [this.visitDto.id],
      date: [this.visitDto.date, [Validators.required]],
      sellerId: [this.visitDto?.seller?.id, [Validators.required]],
      total: [this.visitDto.total, [Validators.required]],
      description: [this.visitDto.description],
      clientInfoId: [this.visitDto.clientInfoId]
    });
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    let visitDto = { ...this.formGroup.value };
    console.log(visitDto);
    if (visitDto.id) {      
      this._store.dispatch(VisitActions.updateVisit({ visit: visitDto }));
    } else {
      this._store.dispatch(VisitActions.createVisit({ visit: visitDto }));
    }
  }
}
