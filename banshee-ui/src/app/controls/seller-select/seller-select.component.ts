import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Optional, Self } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { selectAllSellers } from '@redux/seller/selectors/seller.selector';
import * as SellerActions from '@redux/seller/actions/seller.actions';
import { NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store, select } from '@ngrx/store';
import { SellerDto } from '@redux/seller/models/seller-dto.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseControlValueAccessor } from '../base-control-value-accessor';

@Component({
  selector: 'app-seller-select',
  templateUrl: './seller-select.component.html',
  styleUrls: ['./seller-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: SellerSelectComponent }
  ]
})
export class SellerSelectComponent extends BaseControlValueAccessor<string | string[]> implements OnInit {

  sellers$: Observable<SellerDto[]>;

  @Input()
  customClass;

  constructor(
    elementRef: ElementRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Self() @Optional() public ngControl: NgControl,
    private _store: Store
  ) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
  }

  ngOnInit(): void {
    this.sellers$ = this._store.pipe(
      select(selectAllSellers)
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [({ id: null, name: '--' } as SellerDto), ...data];
        }
        return data;
      }),
      tap((data) => {
        if (this.multiple && data.length === 0) {
          this._store.dispatch(SellerActions.loadSellers({ filter: {} }));
        } else if (!this.multiple && data.length === 1) {
          this._store.dispatch(SellerActions.loadSellers({ filter: {} }));
        }
      })
    );
  }
} 
