import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateDinosaureComponent} from "./dinosaure/create-dinosaure/create-dinosaure.component";
import {ListDinosaureComponent} from "./dinosaure/list-dinosaure/list-dinosaure.component";
import {InfosDinosaureComponent} from "./dinosaure/infos-dinosaure/infos-dinosaure.component";
import {UpdateDinosaureComponent} from "./dinosaure/update-dinosaure/update-dinosaure.component";
import {LoginDinosaureComponent} from "./login/login-dinosaure/login-dinosaure.component";


const routes: Routes = [
  { path: '', redirectTo: 'login-dinosaure', pathMatch: 'full'},
  { path: 'create-dinosaure', component: CreateDinosaureComponent},
  { path: 'list-dinosaure', component: ListDinosaureComponent},
  { path: 'infos-dinosaure/:id', component: InfosDinosaureComponent},
  { path: 'update-dinosaure/:id', component: UpdateDinosaureComponent},
  { path: 'login-dinosaure', component: LoginDinosaureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
