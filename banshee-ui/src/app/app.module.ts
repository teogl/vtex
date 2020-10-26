import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from 'src/reducers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './localization/i18n.localization';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CoreModule } from './core/core.module';
import { CoreModule as CraftsCore } from '@craftsjs/core';
import { NotifierModule } from '@craftsjs/notifier';
import { AlertModule } from '@craftsjs/alert';
import { ModalModule } from '@craftsjs/modal';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientInfoModule } from './client-info/client-info.module';
import { VisitModule } from './visit/visit.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    CoreModule.forRoot(),
    CraftsCore,
    AlertModule.forRoot(),
    NotifierModule.forRoot(),
    ModalModule.forRoot(),
    MatNativeDateModule,
    ClientInfoModule,
    VisitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
