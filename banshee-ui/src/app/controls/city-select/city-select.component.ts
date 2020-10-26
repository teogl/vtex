import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Optional, Self } from '@angular/core';
import { NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { select, Store } from '@ngrx/store';
import { CityDto } from '@redux/location/models/location-dto.model';
import { selectAllCities } from '@redux/location/selectors/location.selector';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseControlValueAccessor } from '../base-control-value-accessor';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: CitySelectComponent }
  ]
})
export class CitySelectComponent extends BaseControlValueAccessor<string | string[]> {

  cities$: Observable<CityDto[]> = of([]);

  @Input()
  customClass;

  @Input()
  countryId: string;

  @Input()
  set state(stateId: string) {
    this.loadCities(stateId);
  }

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

  loadCities(stateId: string) {
    this.cities$ = this._store.pipe(
      select(selectAllCities(this.countryId, stateId))
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [({ id: null, name: '--' } as CityDto), ...data as any];
        }
        return data;
      })
    );
  }
} 
