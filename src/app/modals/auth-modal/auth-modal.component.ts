import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../state/app.state';
import { selectUsers } from '../../state/selectors/users.selectors';
import { Store } from '@ngrx/store';
import { User } from 'src/app/data.models/user.model';
import { setAuthedUser } from '../../state/actions/authedUser.actions';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-auth-modal',
    templateUrl: './auth-modal.component.html',
    styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit, OnDestroy {

    public allUsers: { [key: string]: User } = {};
    public userIds: string[] = [];
    public usersSubscription: Subscription | null = null;

    public loginForm: FormGroup = new FormGroup({
        username: new FormControl('', [
            Validators.required
        ])
    });

    constructor(
        private store: Store<AppState>,
        private activeModal: NgbActiveModal
    ) {
    }

    ngOnInit(): void {
        this.usersSubscription = this.store.select(selectUsers)
            .subscribe((users) => {
                if (users) {
                    this.allUsers = users;
                    this.userIds = Object.keys(this.allUsers).map((id) => (id));
                }
            });
    }

    ngOnDestroy(): void {
        this.usersSubscription?.unsubscribe();
    }

    public login() {
        const userId = this.loginForm.get('username')?.value;
        if (this.allUsers[userId]) {
            this.store.dispatch(setAuthedUser({ userId: userId }));
            this.activeModal.dismiss('Close click');
        }
    }

}
