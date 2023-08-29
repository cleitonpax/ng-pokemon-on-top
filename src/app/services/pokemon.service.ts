import { NamedAPIResourceList, Pokemon, PokemonClient } from 'pokenode-ts';
import { Observable, from } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private api = new PokemonClient();

  public getPokemonByName(name: string): Observable<Pokemon> {
    return from(this.api.getPokemonByName(name));
  }

  public listPokemons(offset: number, limit: number): Observable<NamedAPIResourceList> {
    return from(this.api.listPokemons(offset, limit));
  }

  public getPokemonAvatar(url: string): string {
    const urlSplitted = url.split('/');
    const id = urlSplitted[urlSplitted.length - 2];
    return `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;
  }
}
