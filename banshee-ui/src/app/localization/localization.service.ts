import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class LocalizationService {

    constructor(private readonly _translateService: TranslateService) { }

    initDefaultLanguage() {
        this._translateService.addLangs(['es']);
        this._translateService.setDefaultLang('es');
        moment.locale('es');
        this._translateService.use('es');
    }
}
