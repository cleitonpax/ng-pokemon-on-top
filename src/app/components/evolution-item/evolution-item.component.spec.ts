import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionItemComponent } from './evolution-item.component';
import { Item } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

describe('EvolutionItemComponent', () => {
  let component: EvolutionItemComponent;
  let fixture: ComponentFixture<EvolutionItemComponent>;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionItemComponent ],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getItemByName: () => of({ names: [{ language: { name: 'en' }, name: 'Test Item' }] } as Item)
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionItemComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the label for the item', () => {
    const item = { names: [{ language: { name: 'en' }, name: 'Test Item' }] } as Item;
    spyOn(pokemonService, 'getItemByName').and.returnValue(of(item));
    expect(component.getLabel(item)).toEqual('Test Item');
  });
});