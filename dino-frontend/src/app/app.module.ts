import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateDinosaureComponent } from './dinosaure/create-dinosaure/create-dinosaure.component';
import { ListDinosaureComponent } from './dinosaure/list-dinosaure/list-dinosaure.component';
import { InfosDinosaureComponent } from './dinosaure/infos-dinosaure/infos-dinosaure.component';
import { LoginDinosaureComponent } from './login/login-dinosaure/login-dinosaure.component';
import { UpdateDinosaureComponent } from './dinosaure/update-dinosaure/update-dinosaure.component';
import { DinosaureService } from './services/dinosaure.service';
import { GlobalService } from './services/global.service';
import { AddFriendComponent } from './dinosaure/add-friend/add-friend.component';
import { AddDinoModalComponent } from './dinosaure/add-dino-modal/add-dino-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    CreateDinosaureComponent,
    ListDinosaureComponent,
    InfosDinosaureComponent,
    LoginDinosaureComponent,
    UpdateDinosaureComponent,
    AddFriendComponent,
    AddDinoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DinosaureService, GlobalService],
  bootstrap: [AppComponent],
  entryComponents: [AddFriendComponent, AddDinoModalComponent]
})
export class AppModule { }
