import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { AppState } from '../../state/app.state';
import { selectAuthedUser } from '../../state/selectors/authedUser.selectors';
import { Store } from '@ngrx/store';
import { resetAuthedUser } from 'src/app/state/actions/authedUser.actions';
import { User } from 'src/app/data.models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public authedUser: User | null = null;
    authedUserSubscription: Subscription | null = null;

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.authedUserSubscription = this.store.select(selectAuthedUser)
            .subscribe((authedUser) => {
                this.authedUser = authedUser;
            });
    }

    ngOnDestroy(): void {
        this.authedUserSubscription?.unsubscribe();
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
        this.store.dispatch(resetAuthedUser());
    }
}
