import { Characteristic, EvolutionChain, EvolutionClient, EvolutionTrigger, Item, ItemClient, NamedAPIResourceList, PokemonClient, PokemonSpecies, Stat } from 'pokenode-ts';
import { Observable, from } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonClient = new PokemonClient();
  private evolutionClient = new EvolutionClient();
  private itemClient = new ItemClient();

  getSpeciesByName(name: string): Observable<PokemonSpecies> {
    return from(this.pokemonClient.getPokemonSpeciesByName(name));
  }

  getCharacteristicsById(id: number): Observable<Characteristic> {
    return from(this.pokemonClient.getCharacteristicById(id));
  }

  getEvolutionById(id: number): Observable<EvolutionChain> {
    return from(this.evolutionClient.getEvolutionChainById(id));
  }

  getEvolutionTriggerByName(name: string): Observable<EvolutionTrigger> {
    return from(this.evolutionClient.getEvolutionTriggerByName(name));
  }

  getItemByName(name: string): Observable<Item> {
    return from(this.itemClient.getItemByName(name));
  }

  getStatByName(name: string): Observable<Stat> {
    return from(this.pokemonClient.getStatByName(name));
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
