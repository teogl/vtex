import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Optional, Self } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { select, Store } from '@ngrx/store';
import { LocationDto } from '@redux/location/models/location-dto.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { selectAllLocations } from '@redux/location/selectors/location.selector';
import * as LocationActions from '@redux/location/actions/location.actions';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: CountrySelectComponent }
  ]
})
export class CountrySelectComponent extends BaseControlValueAccessor<string | string[]> implements OnInit {

  Locations$: Observable<LocationDto[]>;

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
    this.Locations$ = this._store.pipe(
      select(selectAllLocations)
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [({ id: null, name: '--' } as LocationDto), ...data];
        }
        return data;
      }),
      tap((data) => {
        if (this.multiple && data.length === 0) {
          this._store.dispatch(LocationActions.loadLocations({ filter: {} }));
        } else if (!this.multiple && data.length === 1) {
          this._store.dispatch(LocationActions.loadLocations({ filter: {} }));
        }
      })
    );
  }
} 
