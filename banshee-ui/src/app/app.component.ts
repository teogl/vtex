import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResponsiveService } from '@craftsjs/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { slideInAnimation } from './animation';
import { LocalizationService } from './localization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {

  unsubscribeAll = new Subject<any>();

  constructor(
    readonly localizationService: LocalizationService,
    private readonly responsiveService: ResponsiveService
  ) { 
    localizationService.initDefaultLanguage();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngAfterViewInit(): void {
    this.responsiveService.resize$.pipe(
      takeUntil(this.unsubscribeAll)
    )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
