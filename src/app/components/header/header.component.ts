import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppState } from '../../state/app.state';
import { selectAuthedUser } from '../../state/authedUser.selectors';
import { Store, select } from '@ngrx/store';
import { setAuthedUser } from 'src/app/state/users.actions';
import { User } from 'src/app/data.models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public authedUser: User | null = null;

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.store.select(selectAuthedUser)
            .subscribe((authedUser) => {
                this.authedUser = authedUser;
            });
    }

    public goToHome() {
        this.router.navigate(['/home']);
    }

    public goToLeaderboard() {
        this.router.navigate(['/leaderboard']);
    }

    public goToAddQuestion() {
        this.router.navigate(['/add']);
    }

    public logout() {
        this.store.dispatch(setAuthedUser({ userId: '' }))
    }

}
