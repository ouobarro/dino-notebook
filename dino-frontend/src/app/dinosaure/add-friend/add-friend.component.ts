import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Dinosaure} from "../../models/dinosaure";
import {DinosaureService} from "../../services/dinosaure.service";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  newFriendForm: FormGroup;
  submitted = false;

  notExist = false;

  allDinoList: Array<Dinosaure>;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private dinosaureService: DinosaureService,
    public  globalService: GlobalService
  ) {
    //this.createForm();
    this.getAllDinoList();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.newFriendForm = this.formBuilder.group({
      friendLogin: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public submitForm() {
    this.submitted = true;
    //this.activeModal.close(this.newFriendForm.value);
  }

  public  addDinoToFriendList(login){
    this.activeModal.close(login);
  }

  addNotAlreadyCreateDino(){
    this.activeModal.close("newFriend");
  }


  async getAllDinoList(){
    var allReadyids = this.globalService.loggedDino.friends;
    allReadyids.push(this.globalService.loggedDino._id);
    let ids = JSON.stringify(allReadyids);
    console.log("allReadyIds: ", ids);
    await  this.dinosaureService.getDinoNotYetFriendList(ids).subscribe(
        async (data) => {
          let allDino: Array<Dinosaure> = Object.values(data);
          console.log(" ===== allDino: ", allDino);
          this.allDinoList = allDino;
        }
    )
  }

}
