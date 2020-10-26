import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class ServiceApiBase {

    protected _http: HttpClient;
    protected _url: string;

    constructor(protected injector: Injector, apiUrl: string) {
        this._http = injector.get(HttpClient);
        this._url = `${environment.url}/${apiUrl}`;
    }

    protected post<T>(url: string): Observable<T>;
    protected post<T, R>(url: string, params: T): Observable<R>;
    protected post<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        return this._http.post<R>(urlSend, params);
    }

    protected put<T>(url: string): Observable<T>;
    protected put<T, R>(url: string, params: T): Observable<R>;
    protected put<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        return this._http.put<R>(urlSend, params);
    }

    protected patch<T>(url: string): Observable<T>;
    protected patch<T, R>(url: string, params: T): Observable<R>;
    protected patch<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        return this._http.patch<R>(urlSend, params);
    }

    protected get<T>(url: string): Observable<T>;
    protected get<T, R>(url: string, params: T): Observable<R>;
    protected get<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        return this._http.get<R>(urlSend, { params: params as any });
    }

    protected delete(id: string) {
        const urlSend = this._url + '/' + id;
        return this._http.delete<any>(urlSend);
    }
}
