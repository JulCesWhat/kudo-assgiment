import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAuthedUser } from 'src/app/state/selectors/authedUser.selectors';
import { saveQuestion } from 'src/app/state/actions/questions.actions';
import { User } from 'src/app/data.models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit, OnDestroy {

    public authedUser: User | null = null;
    authedUserSubscription: Subscription | null = null;

    public newQuestionForm: FormGroup = new FormGroup({
        q1: new FormControl('', [
            Validators.required
        ]),
        q2: new FormControl('', [
            Validators.required
        ])
    });

    constructor(
        private store: Store<AppState>
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

    public addNewQuestion() {
        const body = {
            userId: this.authedUser?.id || '',
            optionOneText: this.newQuestionForm.get('q1')?.value || '',
            optionTwoText: this.newQuestionForm.get('q2')?.value || '',
        }

        this.store.dispatch(saveQuestion({ ...body }));
    }

}
