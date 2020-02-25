import { Component } from '@angular/core';
import {GlobalService} from "./services/global.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mon mini carnet d\'adresse';

  constructor(
    private router: Router,
    public globalService: GlobalService
  ) {
  }

  public logout(){
    this.globalService.isLogged = false;
    this.globalService.loggedDino = null;
    this.router.navigate(['/']);
  }
}
