import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientInfoDto } from '@redux/client-info/models/client-info-dto.model';

@Component({
  selector: 'app-client-info-form-modal',
  templateUrl: './client-info-form-modal.component.html',
  styleUrls: ['./client-info-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientInfoFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<ClientInfoFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public clientInfoDto: ClientInfoDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
