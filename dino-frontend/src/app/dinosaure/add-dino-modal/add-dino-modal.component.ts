import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-dino-modal',
  templateUrl: './add-dino-modal.component.html',
  styleUrls: ['./add-dino-modal.component.scss']
})
export class AddDinoModalComponent implements OnInit {

  submitted = false;
  dinoForm: FormGroup;

  isValid = true;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.createDinoForm();
  }

  ngOnInit(): void {
  }

  createDinoForm() {
    this.dinoForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      password: 'defaultpasswd',
      passwordConfirm: 'defaultpasswd',
      age: ['', [Validators.required]],
      family: ['', [Validators.required]],
      race: ['', [Validators.required]],
      food: ''
    })
  }

  get getDinoForm(){
    return this.dinoForm.controls;
  }

  public submitForm() {
    this.submitted = true;
    if(this.dinoForm.valid){
      this.activeModal.close(this.dinoForm.value);
    }else{
      this.isValid = false;
      return false;
    }
  }

}
