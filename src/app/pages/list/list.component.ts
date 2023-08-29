import { Component } from '@angular/core';
import { NamedAPIResourceList } from 'pokenode-ts';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Store } from '@ngrx/store';
import { getListAction } from 'src/app/store/actions/pokemons.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  pokemonsObservable$?: Observable<NamedAPIResourceList>;
  limit = 8;
  page = 1;

  constructor(
    private api: PokemonService,
    private store: Store<{ pokemons: NamedAPIResourceList }>
    ) {
    this.getPokemons();
    this.pokemonsObservable$ = this.store.select('pokemons');
  }

  getPokemonAvatar(url: string): string {
    return this.api.getPokemonAvatar(url);
  }

  onPageChanged(page: number) {
    this.page = page;
    this.getPokemons();
  }

  private getPokemons() {
    this.store.dispatch(getListAction({ page: this.page, limit: this.limit }));
  }
}
