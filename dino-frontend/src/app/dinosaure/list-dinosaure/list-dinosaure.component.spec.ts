import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDinosaureComponent } from './list-dinosaure.component';

describe('ListDinosaureComponent', () => {
  let component: ListDinosaureComponent;
  let fixture: ComponentFixture<ListDinosaureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDinosaureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDinosaureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
