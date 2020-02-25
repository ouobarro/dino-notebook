import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDinosaureComponent } from './login-dinosaure.component';

describe('LoginDinosaureComponent', () => {
  let component: LoginDinosaureComponent;
  let fixture: ComponentFixture<LoginDinosaureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDinosaureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDinosaureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
