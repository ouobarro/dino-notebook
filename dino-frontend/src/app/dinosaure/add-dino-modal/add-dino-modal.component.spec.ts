import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDinoModalComponent } from './add-dino-modal.component';

describe('AddDinoModalComponent', () => {
  let component: AddDinoModalComponent;
  let fixture: ComponentFixture<AddDinoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDinoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDinoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
