import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEvolutionComponent } from './detail-evolution.component';

describe('DetailEvolutionComponent', () => {
  let component: DetailEvolutionComponent;
  let fixture: ComponentFixture<DetailEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEvolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
