import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpErrorResponseService } from './interceptor/http-error-response.service';
import { VtexHttpInterceptor } from './interceptor/interceptor.service';


@NgModule({})
export class CoreModule { 

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        HttpErrorResponseService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: VtexHttpInterceptor,
          multi: true
        }
      ]
    }
  }

}
