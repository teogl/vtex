import { Injectable } from '@angular/core';
import { VisitDto } from '@redux/visit/models/visit-dto.model';
import { GetVisitDto } from '@redux/visit/models/get-visit-dto.model';
import { Store } from '@ngrx/store';
import { selectVisitLoading, selectVisitTotal, selectVisitsPage } from '@redux/visit/selectors/visit.selector';
import * as VisitActions from '@redux/visit/actions/visit.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDataSource } from '@shared/list/data-source.interface';
import { DataSourceBase } from '@shared/services/data-source-base';

@Injectable()
export class VisitDataSourceService extends DataSourceBase<VisitDto> implements IDataSource<GetVisitDto> {

  public displayedColumns: string[] = ['actions','date','sellerId','total', 'totalVisit','description', ];

  constructor(_store: Store) {
    super(_store, selectVisitLoading, selectVisitTotal, VisitActions.cancelVisitRequest());
  }

  load(pageQuery: PageQueryModel, getVisitDto$: Observable<GetVisitDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectVisitsPage,
      getVisitDto$.pipe(
        map((getvisitDto) => VisitActions.loadVisits({
            filter: {
              ...getvisitDto
            }
        }))
      ));
  }
}
