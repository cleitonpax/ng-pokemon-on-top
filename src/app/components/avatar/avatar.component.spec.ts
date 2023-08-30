import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show image when it is loaded successfully', () => {
    component.url = 'some-url';
    fixture.detectChanges();

    component.isImgLoaded = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.fa-spinner');
    const image = fixture.nativeElement.querySelector('img');

    expect(spinner).toBeNull();
    expect(image).toBeTruthy();
    expect(image.hidden).toBeFalsy();
  });

});
