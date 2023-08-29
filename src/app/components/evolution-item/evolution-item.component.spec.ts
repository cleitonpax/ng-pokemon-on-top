import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionItemComponent } from './evolution-item.component';

describe('EvolutionItemComponent', () => {
  let component: EvolutionItemComponent;
  let fixture: ComponentFixture<EvolutionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
