import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisitDto } from '@redux/visit/models/visit-dto.model';

@Component({
  selector: 'app-visit-form-modal',
  templateUrl: './visit-form-modal.component.html',
  styleUrls: ['./visit-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisitFormModalComponent {

  constructor(
    private _dialogRef: MatDialogRef<VisitFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public visitDto: VisitDto
  ) { }

  close() {
    this._dialogRef.close();
  }

}
