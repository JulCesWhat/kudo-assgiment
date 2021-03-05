import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAuthedUser } from 'src/app/state/selectors/authedUser.selectors';
import { addQuestion } from 'src/app/state/actions/questions.actions';
import { Question } from 'src/app/data.models/question.model';
import { User } from 'src/app/data.models/user.model';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

    public authedUser: User | null = null;

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
        this.store.select(selectAuthedUser)
            .subscribe((authedUser) => {
                console.log('selectAuthedUser')
                console.log(authedUser)
                this.authedUser = authedUser;
            });
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
                this.router.navigate(['/home']);
            }).catch((apiError) => {

            });
    }

}
