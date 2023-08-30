import { ChainLink, EvolutionChain } from 'pokenode-ts';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEvolutionComponent } from './detail-evolution.component';
import { PokemonService } from 'src/app/services/pokemon.service';

describe('DetailEvolutionComponent', () => {
  let component: DetailEvolutionComponent;
  let fixture: ComponentFixture<DetailEvolutionComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    pokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonAvatarByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ DetailEvolutionComponent ],
      providers: [
        { provide: PokemonService, useValue: pokemonService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEvolutionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty array if evolution is null', () => {
    component.evolution = null;
    expect(component.evolutionChain).toEqual([]);
  });

  it('should return the evolution chain', () => {
    const evolution = {
      chain: {
        species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
        evolves_to: [
          {
            species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
            evolves_to: [
              {
                species: { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon-species/3/' },
                evolves_to: []
              }
            ]
          }
        ]
      }
    } as unknown as EvolutionChain;
    component.evolution = evolution;
    const expectedChain: ChainLink[] = [
      evolution.chain,
      evolution.chain.evolves_to[0],
      evolution.chain.evolves_to[0].evolves_to[0]
    ];
    expect(component.evolutionChain).toEqual(expectedChain);
  });
});