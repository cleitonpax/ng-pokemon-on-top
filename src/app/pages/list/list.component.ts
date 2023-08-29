import { Component } from '@angular/core';
import { ListState } from 'src/app/store/reducers/list.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getListAction } from 'src/app/store/actions/list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  listObservable$?: Observable<ListState>;
  limit = 8;
  page = 1;

  constructor(private store: Store<{ list: ListState }>) {
    this.getList();
    this.listObservable$ = this.store.select('list');
  }

  onPageChanged(page: number) {
    this.page = page;
    this.getList();
  }

  private getList() {
    this.store.dispatch(getListAction({ page: this.page, limit: this.limit }));
  }
}
