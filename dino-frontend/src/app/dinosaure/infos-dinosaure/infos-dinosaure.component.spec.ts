import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosDinosaureComponent } from './infos-dinosaure.component';

describe('InfosDinosaureComponent', () => {
  let component: InfosDinosaureComponent;
  let fixture: ComponentFixture<InfosDinosaureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosDinosaureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosDinosaureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
