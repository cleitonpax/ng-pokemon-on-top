import { EvolutionChain, EvolutionClient, NamedAPIResourceList, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import { Observable, from } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonClient = new PokemonClient();
  private evolutionCliente = new EvolutionClient();

  getPokemonSpecieByName(name: string): Observable<PokemonSpecies> {
    return from(this.pokemonClient.getPokemonSpeciesByName(name));
  }

  getEvolutionById(id: number): Observable<EvolutionChain> {
    return from(this.evolutionCliente.getEvolutionChainById(id));
  }

  listPokemonSpecies(page: number, limit: number): Observable<NamedAPIResourceList> {
    const offset = (page - 1) * limit;
    return from(this.pokemonClient.listPokemonSpecies(offset, limit));
  }

  getPokemonAvatarByUrl(url: string): string {
    const urlSplitted = url.split('/');
    const id = urlSplitted[urlSplitted.length - 2];
    return this.getPokemonAvatarById(Number(id));
  }

  getPokemonAvatarById(id: number): string {
    return `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;
  }
}
