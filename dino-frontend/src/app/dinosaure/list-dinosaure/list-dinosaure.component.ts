import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

import {Dinosaure} from "../../models/dinosaure";
import {GlobalService} from "../../services/global.service";
import {DinosaureService} from "../../services/dinosaure.service";
import { AddFriendComponent } from '../../dinosaure/add-friend/add-friend.component'

@Component({
  selector: 'app-list-dinosaure',
  templateUrl: './list-dinosaure.component.html',
  styleUrls: ['./list-dinosaure.component.scss']
})
export class ListDinosaureComponent implements OnInit {

  currentDino: Dinosaure = null;
  friendList: Array<Dinosaure>;

  hasFriends = false;
  selfAdd = false;

  constructor(
    private modalService: NgbModal,
    public globalService: GlobalService,
    private dinoService: DinosaureService
  ) { }

  ngOnInit(): void {
    this.currentDino = this.globalService.loggedDino;
    if(this.currentDino){
      this.getDinoFriendList()
    }
  }


  async addNewFriend(){
    const modalRef = this.modalService.open(AddFriendComponent, {size: 'md', centered: true});

    await modalRef.result.then( async (result) => {
      console.log(result);
      let friendDino = await this.getDinosaureByLogin(result.friendLogin);
      if(friendDino){
        this.addDinoToFriendList(friendDino._id);
      }else{
        console.log("Aucun un ami Dino trouvé avec l'identifiant saisi !");
      }
    }).catch((error) => {
      console.log(error);
    });

  }

  public async deleteDino(dinoId){
    const index: number = this.currentDino.friends.indexOf(dinoId);
    if (index !== -1) {
      this.currentDino.friends.splice(index, 1);
    }
    await this.dinoService.updateDinosaure(this.currentDino._id, this.currentDino).subscribe(
      async (res) => {
        console.log('Dino successfully updated!');
        await this.getDinoFriendList();
      }, (error) => {
        console.log(error);
      });
  }

  //Get dino by login
  async getDinosaureByLogin(login: string) {
    let dino: Dinosaure = await this.dinoService.getDinosaureByLogin(login).toPromise();
    if(dino){
      return dino;
    }else{
      return null;
    }
  }

  async addDinoToFriendList(dinoId){
    if(this.currentDino._id !== dinoId){
      this.currentDino.friends.push(dinoId);
      await this.dinoService.updateDinosaure(this.currentDino._id, this.currentDino).subscribe(
        async (res) => {
          console.log('Dino successfully updated!');
          await this.getDinoFriendList();
        }, (error) => {
          console.log(error);
        });
    }else{
      this.selfAdd = true;
    }

  }


  async getDinoFriendList(){
    console.log("this.currentDino.friends: ", this.currentDino.friends);
    console.log("JSON [this.currentDino.friends]: ", JSON.stringify(this.currentDino.friends));
    let ids = JSON.stringify(this.currentDino.friends);
    this.friendList = await this.dinoService.getDinoFriendList(ids).toPromise();
    if(this.friendList && this.friendList.length > 0){
      this.hasFriends = true;
      console.log("Dino friendList: ", this.friendList);
    }else{
      this.hasFriends = false;
    }
  }
}
