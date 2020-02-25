import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDinosaureComponent } from './update-dinosaure.component';

describe('UpdateDinosaureComponent', () => {
  let component: UpdateDinosaureComponent;
  let fixture: ComponentFixture<UpdateDinosaureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDinosaureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDinosaureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
