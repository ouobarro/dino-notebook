import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDinosaureComponent } from './create-dinosaure.component';

describe('CreateDinosaureComponent', () => {
  let component: CreateDinosaureComponent;
  let fixture: ComponentFixture<CreateDinosaureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDinosaureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDinosaureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
