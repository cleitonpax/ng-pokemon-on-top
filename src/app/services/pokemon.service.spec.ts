import { Characteristic, EvolutionChain, EvolutionClient, EvolutionTrigger, Item, ItemClient, NamedAPIResourceList, PokemonClient, PokemonSpecies, Stat } from 'pokenode-ts';

import { PokemonService } from './pokemon.service';
import { TestBed } from '@angular/core/testing';

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
    const pokemonSpecies = { name: 'pikachu' } as PokemonSpecies;
    pokemonClientSpy.getPokemonSpeciesByName.and.returnValue(Promise.resolve(pokemonSpecies));

    service.getSpeciesByName('pikachu').subscribe(result => {
      expect(result).toEqual(pokemonSpecies as unknown as PokemonSpecies);
    });
  });

  it('should get characteristics by id', () => {
    const characteristic = { id: 1 } as Characteristic;
    pokemonClientSpy.getCharacteristicById.and.returnValue(Promise.resolve(characteristic));

    service.getCharacteristicsById(1).subscribe(result => {
      expect(result).toEqual(characteristic as unknown as Characteristic);
    });
  });

  it('should get evolution by id', () => {
    const evolutionChain = { id: 1 } as EvolutionChain;
    evolutionClientSpy.getEvolutionChainById.and.returnValue(Promise.resolve(evolutionChain));

    service.getEvolutionById(1).subscribe(result => {
      expect(result).toEqual(evolutionChain as unknown as EvolutionChain);
    });
  });

  it('should get evolution trigger by name', () => {
    const evolutionTrigger = { name: 'level-up' } as EvolutionTrigger;
    evolutionClientSpy.getEvolutionTriggerByName.and.returnValue(Promise.resolve(evolutionTrigger));

    service.getEvolutionTriggerByName('level-up').subscribe(result => {
      expect(result).toEqual(evolutionTrigger as unknown as EvolutionTrigger);
    });
  });

  it('should get item by name', () => {
    const item = { name: 'potion' } as Item;
    itemClientSpy.getItemByName.and.returnValue(Promise.resolve(item));

    service.getItemByName('potion').subscribe(result => {
      expect(result).toEqual(item as unknown as Item);
    });
  });

  it('should get stat by name', () => {
    const stat = { name: 'speed' } as Stat;
    pokemonClientSpy.getStatByName.and.returnValue(Promise.resolve(stat));
  
    service.getStatByName('speed').subscribe(result => {
      expect(result).toEqual(stat as unknown as Stat);
    });
  });

  it('should list pokemon species', () => {
    const namedAPIResourceList = { count: 1, results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' }
    ]} as NamedAPIResourceList;
    pokemonClientSpy.listPokemonSpecies.and.returnValue(Promise.resolve(namedAPIResourceList));

    service.listPokemonSpecies(1, 1).subscribe(result => {
      expect(result).toEqual(namedAPIResourceList as unknown as NamedAPIResourceList);
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