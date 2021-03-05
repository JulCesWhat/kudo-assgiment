import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../state/app.state';
import { selectUsers } from '../../state/users.selectors';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/data.models/user.model';
import { setAuthedUser } from '../../state/authedUser.actions';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-auth-modal',
    templateUrl: './auth.modal.component.html',
    styleUrls: ['./auth.modal.component.css']
})
export class AuthModalComponent implements OnInit {

    public allUsers: { [key: string]: User } = {};

    public loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [
            Validators.required
        ])
    });

    constructor(
        private store: Store<AppState>,
        private activeModal: NgbActiveModal
    ) {
        this.store.select(selectUsers)
            .subscribe((users) => {
                this.allUsers = users;
            });
    }

    ngOnInit(): void {
    }

    public login() {
        const userId = this.loginForm.get('username')?.value;
        if (this.allUsers[userId]) {
            this.store.dispatch(setAuthedUser({ userId: userId }));
            this.activeModal.dismiss('Close click');
        } else {

        }
    }

}
