import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAuthedUser } from 'src/app/state/selectors/authedUser.selectors';
import { addQuestion } from 'src/app/state/actions/questions.actions';
import { Question } from 'src/app/data.models/question.model';
import { User } from 'src/app/data.models/user.model';
import { addUserQuestion } from 'src/app/state/actions/users.actions';
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
        private apiService: ApiService,
        private router: Router,
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
            author: this.authedUser?.id,
            optionOneText: this.newQuestionForm.get('q1')?.value,
            optionTwoText: this.newQuestionForm.get('q2')?.value,
        }
        this.apiService.saveQuestion(body)
            .then((question: Question) => {
                this.store.dispatch(addQuestion({ question }));
                this.store.dispatch(addUserQuestion({
                    userId: this.authedUser?.id || '',
                    questionId: question?.id
                }));
                this.router.navigate(['/home']);
            }).catch((apiError) => {

            });
    }

}
