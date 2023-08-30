import { EvolutionClient, ItemClient, PokemonClient } from 'pokenode-ts';

import { PokemonService } from './pokemon.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('PokemonService', () => {
  let service: PokemonService;
  let pokemonClientSpy: jasmine.SpyObj<PokemonClient>;
  let evolutionClientSpy: jasmine.SpyObj<EvolutionClient>;
  let itemClientSpy: jasmine.SpyObj<ItemClient>;

  beforeEach(() => {
    const pokemonClient = jasmine.createSpyObj('PokemonClient', ['getCharacteristicById', 'getPokemonSpeciesByName', 'getStatByName', 'listPokemonSpecies']);
    const evolutionClient = jasmine.createSpyObj('EvolutionClient', ['getEvolutionChainById', 'getEvolutionTriggerByName']);
    const itemClient = jasmine.createSpyObj('ItemClient', ['getItemByName']);

    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        { provide: PokemonClient, useValue: pokemonClient },
        { provide: EvolutionClient, useValue: evolutionClient },
        { provide: ItemClient, useValue: itemClient }
      ]
    });

    service = TestBed.inject(PokemonService);
    pokemonClientSpy = TestBed.inject(PokemonClient) as jasmine.SpyObj<PokemonClient>;
    evolutionClientSpy = TestBed.inject(EvolutionClient) as jasmine.SpyObj<EvolutionClient>;
    itemClientSpy = TestBed.inject(ItemClient) as jasmine.SpyObj<ItemClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pokemon species by name', () => {
    const pokemonSpecies = { name: 'pikachu' };
    pokemonClientSpy.getPokemonSpeciesByName.and.returnValue(of(pokemonSpecies) as any);

    service.getSpeciesByName('pikachu').subscribe(result => {
      expect(result).toEqual(pokemonSpecies as any);
    });
  });

  it('should get characteristics by id', () => {
    const characteristic = { id: 1 };
    pokemonClientSpy.getCharacteristicById.and.returnValue(of(characteristic) as any);

    service.getCharacteristicsById(1).subscribe(result => {
      expect(result).toEqual(characteristic as any);
    });
  });

  it('should get evolution by id', () => {
    const evolutionChain = { id: 1 };
    evolutionClientSpy.getEvolutionChainById.and.returnValue(of(evolutionChain) as any);

    service.getEvolutionById(1).subscribe(result => {
      expect(result).toEqual(evolutionChain as any);
    });
  });

  it('should get evolution trigger by name', () => {
    const evolutionTrigger = { name: 'level-up' };
    evolutionClientSpy.getEvolutionTriggerByName.and.returnValue(of(evolutionTrigger) as any);

    service.getEvolutionTriggerByName('level-up').subscribe(result => {
      expect(result).toEqual(evolutionTrigger as any);
    });
  });

  it('should get item by name', () => {
    const item = { name: 'potion' };
    itemClientSpy.getItemByName.and.returnValue(of(item) as any);

    service.getItemByName('potion').subscribe(result => {
      expect(result).toEqual(item as any);
    });
  });

  it('should get stat by name', () => {
    const stat = { name: 'speed' };
    pokemonClientSpy.getStatByName.and.returnValue(of(stat) as any);

    service.getStatByName('speed').subscribe(result => {
      expect(result).toEqual(stat as any);
    });
  });

  it('should list pokemon species', () => {
    const namedAPIResourceList = { count: 1, results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' }] };
    pokemonClientSpy.listPokemonSpecies.and.returnValue(of(namedAPIResourceList) as any);

    service.listPokemonSpecies(1, 1).subscribe(result => {
      expect(result).toEqual(namedAPIResourceList as any);
    });
  });

  it('should get pokemon avatar by url', () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/25/';
    const avatarUrl = 'https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/25.svg';

    expect(service.getPokemonAvatarByUrl(url)).toEqual(avatarUrl);
  });

  it('should get pokemon avatar by id', () => {
    const id = 25;
    const avatarUrl = 'https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/25.svg';

    expect(service.getPokemonAvatarById(id)).toEqual(avatarUrl);
  });
});