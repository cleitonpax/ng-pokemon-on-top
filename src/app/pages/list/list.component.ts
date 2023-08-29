import { Component } from '@angular/core';
import { NamedAPIResourceList } from 'pokenode-ts';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Store } from '@ngrx/store';
import { getListAction } from 'src/app/store/actions/list.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  listObservable$?: Observable<NamedAPIResourceList>;
  limit = 8;
  page = 1;

  constructor(
    private api: PokemonService,
    private store: Store<{ list: NamedAPIResourceList }>
    ) {
    this.getList();
    this.listObservable$ = this.store.select('list');
  }

  getPokemonAvatar(url: string): string {
    return this.api.getPokemonAvatar(url);
  }

  onPageChanged(page: number) {
    this.page = page;
    this.getList();
  }

  private getList() {
    this.store.dispatch(getListAction({ page: this.page, limit: this.limit }));
  }
}
