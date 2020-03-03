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
    isFriendExist =  false;
    isDinoExist = false;

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
            this.getAllDinoList();
        } else {
            this.router.navigate(['/login-dinosaure']);
        }
        this.selfAdd = false;
        this.isFriendExist = false;
        this.isDinoExist = false;
    }


    //Permet d'ajouter un ami existant dans la liste d'amis
    async addNewFriend() {
        this.selfAdd = false;
        this.isFriendExist = false;
        this.isDinoExist = false;
        const modalRef = this.modalService.open(AddFriendComponent, {size: 'lg', centered: true});

        await modalRef.result.then(async (result) => {
            if (result !== "newFriend") {
                let friendDino = await this.getDinosaureByLogin(result);
                if (friendDino !== null) {
                    this.addDinoToFriendList(friendDino);
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

    //Permet de créer un ami et de l'ajouter en même temps dans la liste d'amis
    async createAndaddNewFriend() {
        this.isFriendExist = false;
        this.isDinoExist = false;
        const modalRef = this.modalService.open(AddDinoModalComponent, {size: 'lg', centered: true});

        await modalRef.result.then(async (result) => {

            if(this.isLoginExist(result.login)){
                this.isDinoExist = true;
                if(!this.isLoginInFriendList(result.login)){
                    this.isFriendExist = false;
                    let friendDino = await this.getDinosaureByLogin(result.login);
                    if (friendDino !== null) {
                        this.addDinoToFriendList(friendDino);
                    } else {
                        console.log("Aucun un ami Dino trouvé avec l'identifiant saisi !");
                    }
                }else{
                    this.isFriendExist = true;
                }
            }else {
                this.isDinoExist = false;
                this.dinoService.createDinosaure(result).subscribe(
                    async (res) => {
                        console.log('Dino successfully created!');
                        await this.addDinoToFriendList(res);
                        await this.getDinoFriendList();
                    }, (error) => {
                        console.log(error);
                    });
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    // Supprime un dino de la liste d'amis
    public async deleteDino(dino) {
        const index: number = this.currentDino.friends.indexOf(dino._id);
        if (index !== -1) {
            this.currentDino.friends.splice(index, 1);
        }

        const currentDinoIdex = dino.friends.indexOf(dino._id);
        if (currentDinoIdex !== -1) {
            dino.friends.splice(currentDinoIdex, 1);
        }
        await this.updateDinausaure(dino);
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

    //Ajoute un dino dans la liste d'amies
    async addDinoToFriendList(dino) {
        this.currentDino.friends.push(dino._id); //Ajout dans ma liste
        dino.friends.push(this.currentDino._id); //ajout dans la liste de l'ami
        await this.updateDinausaure(dino);
    }

    //Renvoie la liste de tous les dinosaure en BDD
    async getAllDinoList() {
        await this.dinoService.getDinosaures().subscribe(
            async (data) => {
                this.allDinoList = Object.values(data);
            }
        );
    }

    //Retourne a liste des dinosaures amis
    async getDinoFriendList() {
        let ids = JSON.stringify(this.currentDino.friends);
        this.friendList = await this.dinoService.getDinoFriendList(ids).toPromise();
        if (this.friendList && this.friendList.length > 0) {
            this.hasFriends = true;
        } else {
            this.hasFriends = false;
        }
    }


    async updateDinausaure(dino){
        //On s'assure que l'ID du dino connecté n'est pas ajouté dans la liste d'amis
        const index: number = this.currentDino.friends.indexOf(this.globalService.loggedDino._id);
        if (index !== -1) {
            this.currentDino.friends.splice(index, 1);
        }

        //MAJ (Ajout de l'ami dans ma liste)
        this.dinoService.updateDinosaure(this.currentDino._id, this.currentDino).subscribe(async (res) => {
            console.log('Dino successfully updated!');
            await this.getDinoFriendList();
        }, (error) => {
            console.log(error);
        });

        //MAJ (ajout dans la liste de l'ami)
        this.dinoService.updateDinosaure(dino._id, dino).subscribe(async (res) => {
            console.log('Dino successfully updated!');
            await this.getDinoFriendList();
        }, (error) => {
            console.log(error);
        });
    }

    //Vérifie si un dinosaure avec un login donné est déjà existant
    isLoginExist(login){
        for(let dino of this.allDinoList){
            if(dino.login === login){
                return true;
            }
        }
        return false;
    }

    //Verifie si un dino existe dans la liste en tant qu'ami
    isLoginInFriendList(login){
        for(let dino of this.friendList){
            if(dino.login === login){
                return true;
            }
        }
        return false;
    }

}
