import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionTriggerComponent } from './evolution-trigger.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

describe('EvolutionTriggerComponent', () => {
  let component: EvolutionTriggerComponent;
  let fixture: ComponentFixture<EvolutionTriggerComponent>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    pokemonService = jasmine.createSpyObj('PokemonService', ['getEvolutionTriggerByName']);
    await TestBed.configureTestingModule({
      declarations: [ EvolutionTriggerComponent ],
      providers: [
        { provide: PokemonService, useValue: pokemonService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionTriggerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the label for the evolution trigger', () => {
    const trigger: any = {
      id: 1,
      names: [
        { language: { name: 'en' }, name: 'Level up' },
        { language: { name: 'fr' }, name: 'Niveau supérieur' }
      ]
    };
    pokemonService.getEvolutionTriggerByName.and.returnValue(of(trigger));
    component.trigger = 'level-up';
    fixture.detectChanges();
    expect(component.getLabel(trigger)).toBe('Level up');
  });
});