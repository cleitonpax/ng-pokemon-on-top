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
  public pokemonPayload$?: Observable<NamedAPIResourceList>;
  public limit = 8;
  public offset = 0;

  constructor(private api: PokemonService) {
    this.fetchPokemons();
  }

  public getPokemonAvatar(url: string): string {
    return this.api.getPokemonAvatar(url);
  }

  public handlePageEvent(e: any) {
    this.offset = e.pageIndex;
    this.fetchPokemons();
  }

  private fetchPokemons() {
    this.pokemonPayload$ = this.api.listPokemons(this.offset, this.limit);
  }
}
