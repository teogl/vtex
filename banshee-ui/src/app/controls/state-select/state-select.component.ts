import { ChangeDetectionStrategy, Component, ElementRef, Input, Optional, Self } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { StateDto } from '@redux/location/models/location-dto.model';
import { Observable, of } from 'rxjs';
import { BaseControlValueAccessor } from '../base-control-value-accessor';
import { selectAllStates } from '@redux/location/selectors/location.selector';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: StateSelectComponent }
  ]
})
export class StateSelectComponent extends BaseControlValueAccessor<string | string[]> {

  states$: Observable<StateDto[]> = of([]);

  @Input()
  customClass;

  @Input()
  set country(countryId: string) {
    this.loadStates(countryId);
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

  loadStates(countryId: string) {
    this.states$ = this._store.pipe(
      select(selectAllStates(countryId))
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [({ id: null, name: '--' } as StateDto), ...data as any];
        }
        return data;
      })
    );
  }
} 
