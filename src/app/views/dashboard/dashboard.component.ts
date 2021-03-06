import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { selectAnsweredQuestion, selectUnansweredQuestion } from '../../state/selectors/authedUser.selectors';
import { selectUsers } from '../../state/selectors/users.selectors';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public showAnswered: boolean = true;
    public answeredQuestion$ = this.store.pipe(select(selectAnsweredQuestion));
    public unansweredQuestion$ = this.store.pipe(select(selectUnansweredQuestion));
    public users$ = this.store.pipe(select(selectUsers));

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    public toggle(show: boolean) {
        this.showAnswered = show;
    }

    public onClicked(id: string) {
        this.router.navigate(['/question', id]);
    }

}
