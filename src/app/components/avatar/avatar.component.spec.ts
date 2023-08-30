import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Pokemon } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ PokemonService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pokemon$ when name is provided', () => {
    const pokemon = { name: 'pikachu', sprites: { other: { 'dream_world': { front_default: 'url' } } } } as Pokemon;
    spyOn(pokemonService, 'getPokemonByName').and.returnValue(of(pokemon));
    component.name = 'pikachu';
    component.ngOnInit();
    
    component.pokemon$?.subscribe((emittedPokemon) => {
      expect(emittedPokemon).toEqual(pokemon);
    });
  });
  

  it('should return default avatar when pokemon is undefined', () => {
    const pokemon = undefined;
    const avatar = component.getPokemonAvatar(pokemon as unknown as Pokemon);
    expect(avatar).toEqual('assets/icon.svg');
  });

  it('should return dream_world avatar when available', () => {
    const pokemon = { name: 'pikachu', sprites: { other: { 'dream_world': { front_default: 'url' } } } };
    const avatar = component.getPokemonAvatar(pokemon as Pokemon);
    expect(avatar).toEqual('url');
  });

  it('should return official-artwork avatar when dream_world is not available', () => {
    const pokemon = { name: 'pikachu', sprites: { other: { 'official-artwork': { front_default: 'url' } } } };
    const avatar = component.getPokemonAvatar(pokemon as Pokemon);
    expect(avatar).toEqual('url');
  });

  it('should return default avatar when both dream_world and official-artwork are not available', () => {
    const pokemon = { name: 'pikachu', sprites: { other: {} } };
    const avatar = component.getPokemonAvatar(pokemon as Pokemon);
    expect(avatar).toEqual('assets/icon.svg');
  });
});