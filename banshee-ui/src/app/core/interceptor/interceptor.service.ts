import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponseService } from './http-error-response.service';

@Injectable()
export class VtexHttpInterceptor implements HttpInterceptor {

  constructor(
    private httpErrorResponseService: HttpErrorResponseService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const modifiedRequest = this.normalizeRequestHeaders(request);
    return next.handle(modifiedRequest).pipe(
      catchError((error) => {
        this.handleErrorResponse(error);
        throw error;
      })
    );
  }

  private normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
    let modifiedHeaders = new HttpHeaders();
    modifiedHeaders = request.headers.set('Localization.CultureName', 'es');
    return request.clone({
      headers: modifiedHeaders
    });
  }

  protected handleErrorResponse(response: any) {
    if (response.error != null) {
      this.httpErrorResponseService.showError(response.error);
    } else {
      const errorResponse = new HttpResponse({
        headers: response.headers,
        status: response.status,
        body: response.error
      });
      this.httpErrorResponseService.handleNonErrorResponse(errorResponse);
    }
  }

}
