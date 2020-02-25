import { Component, OnInit } from '@angular/core';
import {DinosaureService} from "../../services/dinosaure.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-dinosaure',
  templateUrl: './create-dinosaure.component.html',
  styleUrls: ['./create-dinosaure.component.scss']
})
export class CreateDinosaureComponent implements OnInit {

  submitted = false;
  dinoForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private dinoService: DinosaureService
  ) {
    this.createDinoForm();
  }

  ngOnInit(): void {
  }

  createDinoForm() {
    this.dinoForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(4)]],
      age: ['', [Validators.required]],
      family: ['', [Validators.required]],
      race: ['', [Validators.required]],
      food: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.dinoForm.valid) {
      return false;
    } else {
      this.dinoService.createDinosaure(this.dinoForm.value).subscribe(
        (res) => {
          console.log('Dino successfully created!');
          this.router.navigateByUrl('/login-dinosaure');
        }, (error) => {
          console.log(error);
        });
    }
  }

  get getDinoForm(){
    return this.dinoForm.controls;
  }


}
