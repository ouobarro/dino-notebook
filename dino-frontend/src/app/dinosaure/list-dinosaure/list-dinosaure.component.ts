import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

import {Dinosaure} from "../../models/dinosaure";
import {GlobalService} from "../../services/global.service";
import {DinosaureService} from "../../services/dinosaure.service";
import {AddFriendComponent} from '../../dinosaure/add-friend/add-friend.component'
import {AddDinoModalComponent} from "../add-dino-modal/add-dino-modal.component";

@Component({
    selector: 'app-list-dinosaure',
    templateUrl: './list-dinosaure.component.html',
    styleUrls: ['./list-dinosaure.component.scss']
})
export class ListDinosaureComponent implements OnInit {

    currentDino: Dinosaure = null;
    friendList: Array<Dinosaure>;

    allDinoList: Array<Dinosaure>;

    hasFriends = false;
    selfAdd = false;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        public globalService: GlobalService,
        private dinoService: DinosaureService
    ) {
    }

    ngOnInit(): void {
        this.currentDino = this.globalService.loggedDino;
        if (this.currentDino) {
            this.getDinoFriendList();
            //this.getAllDinoList();
        } else {
            this.router.navigate(['/login-dinosaure']);
        }
        this.selfAdd = false;
    }


    async addNewFriend() {
        this.selfAdd = false;
        const modalRef = this.modalService.open(AddFriendComponent, {size: 'lg', centered: true});

        await modalRef.result.then(async (result) => {
            console.log(" result === ", result);
            if (result !== "newFriend") {
                let friendDino = await this.getDinosaureByLogin(result);
                if (friendDino !== null) {
                    this.addDinoToFriendList(friendDino._id);
                } else {
                    console.log("Aucun un ami Dino trouvé avec l'identifiant saisi !");
                }
            } else {
                await this.createAndaddNewFriend();
            }

        }).catch((error) => {
            console.log(error);
        });

    }


    async createAndaddNewFriend() {
        const modalRef = this.modalService.open(AddDinoModalComponent, {size: 'lg', centered: true});

        await modalRef.result.then(async (result) => {
            console.log(result);

            this.dinoService.createDinosaure(result).subscribe(
                async (res) => {
                    console.log('Dino successfully created!');
                    await this.addDinoToFriendList(res._id);
                    await this.getDinoFriendList();
                }, (error) => {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error);
        });

    }

    public async deleteDino(dinoId) {
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
        if (dino) {
            return dino;
        } else {
            return null;
        }
    }

    async addDinoToFriendList(dinoId) {
        console.log("this.globalService.loggedDino === ", this.globalService.loggedDino._id);
        console.log("Before push \n this.currentDino.friends === ", this.globalService.loggedDino.friends);
        this.currentDino.friends.push(dinoId);
        const index: number = this.currentDino.friends.indexOf(this.globalService.loggedDino._id);
        if (index !== -1) {
          this.currentDino.friends.splice(index, 1);
        }
        console.log("this.currentDino.friends === ", this.currentDino.friends);
        await this.dinoService.updateDinosaure(this.currentDino._id, this.currentDino).subscribe(
            async (res) => {
                console.log('Dino successfully updated!');
                await this.getDinoFriendList();
            }, (error) => {
                console.log(error);
            });

    }

    async getAllDinoList() {
        await this.dinoService.getDinosaures().subscribe(
            async (data) => {
                let allDino: Array<Dinosaure> = Object.values(data);
                console.log(" ===== allDino: ", allDino);
                const index: number = allDino.indexOf(this.globalService.loggedDino);
                if (index !== -1) {
                    allDino.splice(index, 1);
                    this.allDinoList = allDino;

                }
            }
        )
    }


    async getDinoFriendList() {
        let ids = JSON.stringify(this.currentDino.friends);
        this.friendList = await this.dinoService.getDinoFriendList(ids).toPromise();
        if (this.friendList && this.friendList.length > 0) {
            this.hasFriends = true;
            console.log("Dino friendList: ", this.friendList);
        } else {
            this.hasFriends = false;
        }
    }
}
