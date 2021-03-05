import { Component, OnInit } from '@angular/core';
import { selectSortedUsers } from '../../state/selectors/users.selectors';
import { AppState } from '../../state/app.state'
import { Store, select } from '@ngrx/store';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

    public users$ = this.store.pipe(select(selectSortedUsers));

    constructor(
        private store: Store<AppState>,
    ) { }

    ngOnInit(): void {
    }

}
