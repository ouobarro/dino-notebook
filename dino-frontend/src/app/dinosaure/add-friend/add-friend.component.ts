import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  newFriendForm: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
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
    this.activeModal.close(this.newFriendForm.value);
  }
}
