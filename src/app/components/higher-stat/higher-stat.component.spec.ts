import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherStatComponent } from './higher-stat.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

describe('HigherStatComponent', () => {
  let component: HigherStatComponent;
  let fixture: ComponentFixture<HigherStatComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    pokemonService = jasmine.createSpyObj('PokemonService', ['getStatByName']);

    await TestBed.configureTestingModule({
      declarations: [ HigherStatComponent ],
      providers: [
        { provide: PokemonService, useValue: pokemonService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HigherStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the label for the given stat', () => {
    const stat: any = {
      id: 1,
      name: 'hp',
      names: [
        { language: { name: 'en' }, name: 'HP' },
        { language: { name: 'ja' }, name: 'HP' }
      ]
    };
    pokemonService.getStatByName.and.returnValue(of(stat));

    component.stat = 'hp';
    component.ngOnInit();

    expect(component.getLabel(stat)).toBe('HP');
  });
});