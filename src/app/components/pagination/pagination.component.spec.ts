import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the correct total number of pages', () => {
    component.total = 100;
    component.limit = 10;
    fixture.detectChanges();
    expect(component.totalPages).toBe(10);
  });

  it('should emit the correct page number when onPageChanged is called', () => {
    spyOn(component.pageChanged, 'emit');
    component.onPageChanged(3);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(3);
  });

  it('should return the correct page numbers for getPages', () => {
    component.total = 100;
    component.limit = 10;
    component.currentPage = 5;
    fixture.detectChanges();
    
    const pages = component.getPages();
    expect(pages).toEqual([3, 4, 5, 6, 7]);
  });

  it('should not show more pages than total pages for getPages', () => {
    component.total = 30;
    component.limit = 10;
    component.currentPage = 3;
    fixture.detectChanges();
    
    const pages = component.getPages();
    expect(pages).toEqual([1, 2, 3]);
  });

  it('should not show fewer pages than total pages for getPages', () => {
    component.total = 30;
    component.limit = 10;
    component.currentPage = 1;
    fixture.detectChanges();
    
    const pages = component.getPages();
    expect(pages).toEqual([1, 2, 3]);
  });
});
