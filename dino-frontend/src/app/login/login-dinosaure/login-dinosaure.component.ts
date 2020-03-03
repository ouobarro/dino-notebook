import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../../services/global.service";
import {DinosaureService} from "../../services/dinosaure.service";

@Component({
  selector: 'app-login-dinosaure',
  templateUrl: './login-dinosaure.component.html',
  styleUrls: ['./login-dinosaure.component.scss']
})
export class LoginDinosaureComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  validCredentiales: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public globalService: GlobalService,
    private dinoService: DinosaureService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      passwd: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  // Getter to access form control
  get getLoginForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      let login: string = this.loginForm.get('login').value;
      let passwd: string = this.loginForm.get('passwd').value;
      let dino = null;
      this.dinoService.getDinosaureByLogin(login).subscribe((data) => {
        if(data.password === passwd){
          this.globalService.loggedDino = data;
          this.globalService.isLogged = true;
          //console.log("Logged dino: ", this.globalService.loginDino);
          this.router.navigate(['/list-dinosaure']);
        } else {
          this.validCredentiales = false;
        }
      }, (error) => {
        this.validCredentiales = false;
        console.log(error);
      });
    }
  }

}
