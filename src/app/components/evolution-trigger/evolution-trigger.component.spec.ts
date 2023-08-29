import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionTriggerComponent } from './evolution-trigger.component';

describe('EvolutionTriggerComponent', () => {
  let component: EvolutionTriggerComponent;
  let fixture: ComponentFixture<EvolutionTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionTriggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
