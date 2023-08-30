import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from '../avatar/avatar.component';
import { ListItemComponent } from './list-item.component';
import { NamedAPIResource } from 'pokenode-ts';
import { PokemonService } from 'src/app/services/pokemon.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemComponent, AvatarComponent ],
      imports: [RouterTestingModule],
      providers: [ PokemonService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name of the item', () => {
    const item: NamedAPIResource = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' };
    component.item = item;
    fixture.detectChanges();
    const nameElement = fixture.nativeElement.querySelector('.name');
    expect(nameElement.textContent).toContain('pikachu');
  });

});