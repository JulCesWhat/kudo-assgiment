import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { selectQuestionById } from '../../state/selectors/questions.selectors';
import { Question } from 'src/app/data.models/question.model';
import { selectAuthedUser, } from 'src/app/state/selectors/authedUser.selectors';
import { selectUserByQuestionId } from '../../state/selectors/users.selectors';
import { ApiService } from '../../services/api.service';
import { saveQuestionAnswer } from '../../state/actions/questions.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

    public question: Question | null = null;
    public answeredQuestion: boolean = false;
    public authedUser: any = null;
    public questionIdFromRoute: string = '';
    public userCreator: any = null;
    public userResponse: string = '';
    public totalVotes: number = 0;
    public selectQuestionByIdSubscription: Subscription | null = null;
    public selectAuthedUserSubscription: Subscription | null = null;
    public selectUserByQuestionIdSubscription: Subscription | null = null;

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        this.questionIdFromRoute = routeParams.get('questionId') || '';

        if (this.questionIdFromRoute) {
            this.selectQuestionByIdSubscription = this.store.select(selectQuestionById(this.questionIdFromRoute))
                .subscribe((question) => {
                    if (question) {
                        this.question = question;
                        this.totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
                    }
                });

            this.selectAuthedUserSubscription = this.store.select(selectAuthedUser)
                .subscribe((authedUser) => {
                    this.authedUser = authedUser;
                    this.userResponse = authedUser?.answers[this.questionIdFromRoute] ? authedUser?.answers[this.questionIdFromRoute] : '';
                });

            this.selectUserByQuestionIdSubscription = this.store.select(selectUserByQuestionId(this.questionIdFromRoute))
                .subscribe((user) => {
                    this.userCreator = user;
                });
        }
    }

    ngOnDestroy(): void {
        this.selectQuestionByIdSubscription?.unsubscribe();
        this.selectAuthedUserSubscription?.unsubscribe();
        this.selectUserByQuestionIdSubscription?.unsubscribe();
    }

    public onClick(option: string) {
        const body = {
            userId: this.authedUser.id || '',
            questionId: this.questionIdFromRoute || '',
            answer: option || ''
        };

        this.store.dispatch(saveQuestionAnswer({ ...body }));
    }
}
