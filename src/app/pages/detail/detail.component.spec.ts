import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ActivatedRoute } from '@angular/router';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { Characteristic } from 'pokenode-ts';
import { DetailComponent } from './detail.component';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  const initialState = { detail: { } };

  const mockActivatedRoute = {
    paramMap: of({ get: (param: string) => param }),
  };

  const mockPokemonService = {
    getPokemonAvatarById: (id: number) => `mock-avatar-url/${id}.png`,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DetailComponent,
        ErrorMessageComponent,
        AvatarComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PokemonService, useValue: mockPokemonService },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPokemonAvatar', () => {
    const avatarUrl = component.getPokemonAvatar(1);
    expect(avatarUrl).toBe('mock-avatar-url/1.png');
  });

  it('should return characteristic description', () => {
    const characteristic = {
      descriptions: [{ language: { name: 'en', url: 'url' }, description: 'Test Description' }],
    } as Characteristic;
    const description = component.getCharacteristic(characteristic);
    expect(description).toBe('Test Description');
  });

  it('should return empty string for missing characteristic', () => {
    const description = component.getCharacteristic(null);
    expect(description).toBe('');
  });

});
