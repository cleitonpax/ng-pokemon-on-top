import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message if provided', () => {
    component.message = 'This is an error message';
    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('.message');
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.textContent).toContain('This is an error message');
  });

  it('should not display any error message if no message is provided', () => {
    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('.message');
    expect(errorMessageElement).toBeFalsy();
  });

});
