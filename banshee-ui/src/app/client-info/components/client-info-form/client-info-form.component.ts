import { Component, OnInit, ChangeDetectionStrategy, Injector, Input } from '@angular/core';
import { selectClientInfoActionState, selectClientInfoLoadingAction } from '@redux/client-info/selectors/client-info.selector';
import * as ClientInfoActions from '@redux/client-info/actions/client-info.actions';
import { FormGroup, Validators } from '@angular/forms';
import { ClientInfoDto } from '@redux/client-info/models/client-info-dto.model';
import { FormBase } from '@shared/forms/form-base';

@Component({
  selector: 'app-client-info-form',
  templateUrl: './client-info-form.component.html',
  styleUrls: ['./client-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientInfoFormComponent extends FormBase implements OnInit {

  formGroup: FormGroup;

  @Input()
  clientInfoDto: ClientInfoDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectClientInfoLoadingAction, selectClientInfoActionState, ClientInfoActions.clientInfoActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      id: [this.clientInfoDto.id],
      nit: [this.clientInfoDto.nit, [Validators.required, Validators.maxLength(100)]],
      fullName: [this.clientInfoDto.fullName, [Validators.required, Validators.maxLength(100)]],
      address: [this.clientInfoDto.address, [Validators.maxLength(200)]],
      phone: [this.clientInfoDto.phone, [Validators.maxLength(50)]],
      countryId: [this.clientInfoDto.country?.id],
      cityId: [this.clientInfoDto.city?.id],
      stateId: [this.clientInfoDto.state?.id],
      space: [this.clientInfoDto.space, [Validators.required]],
      percentageVisits: [this.clientInfoDto.percentageVisits, [Validators.required]],
    });
    this.formGroup.get('countryId').valueChanges.subscribe(() => {
      this.formGroup.get('stateId').setValue(undefined);
    });
    this.formGroup.get('stateId').valueChanges.subscribe(() => {
      this.formGroup.get('cityId').setValue(undefined);
    });
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    let clientInfoDto = { ...this.formGroup.value };
    if (clientInfoDto.id) {
      this._store.dispatch(ClientInfoActions.updateClientInfo({ clientInfo: clientInfoDto }));
    } else {
      this._store.dispatch(ClientInfoActions.createClientInfo({ clientInfo: clientInfoDto }));
    }
  }
}
