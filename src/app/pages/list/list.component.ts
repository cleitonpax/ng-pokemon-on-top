import { Component } from '@angular/core';
import { NamedAPIResourceList } from 'pokenode-ts';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  pokemonPayload$?: Observable<NamedAPIResourceList>;
  limit = 8;
  page = 1;

  constructor(private api: PokemonService) {
    this.fetchPokemons();
  }

  getPokemonAvatar(url: string): string {
    return this.api.getPokemonAvatar(url);
  }

  onPageChanged(page: number) {
    this.page = page;
    console.log('page', page);
    this.fetchPokemons();
  }

  private fetchPokemons() {
    this.pokemonPayload$ = this.api.listPokemons(this.page, this.limit);
  }
}
