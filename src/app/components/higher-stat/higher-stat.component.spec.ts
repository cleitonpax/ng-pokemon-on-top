import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherStatComponent } from './higher-stat.component';

describe('HigherStatComponent', () => {
  let component: HigherStatComponent;
  let fixture: ComponentFixture<HigherStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HigherStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
