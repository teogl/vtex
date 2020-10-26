import { Injectable } from '@angular/core';
import { ClientInfoDto } from '@redux/client-info/models/client-info-dto.model';
import { GetClientInfoDto } from '@redux/client-info/models/get-client-info-dto.model';
import { Store } from '@ngrx/store';
import { selectClientInfoLoading, selectClientInfoTotal, selectClientInfosPage } from '@redux/client-info/selectors/client-info.selector';
import * as ClientInfoActions from '@redux/client-info/actions/client-info.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDataSource } from '@shared/list/data-source.interface';
import { DataSourceBase } from '@shared/services/data-source-base';

@Injectable()
export class ClientInfoDataSourceService extends DataSourceBase<ClientInfoDto> implements IDataSource<GetClientInfoDto> {

  public displayedColumns: string[] = ['actions','nit','fullName','address','phone','location','space','percentageVisits', ];

  constructor(_store: Store) {
    super(_store, selectClientInfoLoading, selectClientInfoTotal, ClientInfoActions.cancelClientInfoRequest());
  }

  load(pageQuery: PageQueryModel, getClientInfoDto$: Observable<GetClientInfoDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectClientInfosPage,
      getClientInfoDto$.pipe(
        map((getClientInfoDto) => ClientInfoActions.loadClientInfos({
            filter: {
              ...getClientInfoDto,
              skip: pageQuery.index * pageQuery.size,
              take: pageQuery.size
            }
        }))
      ));
  }
}
