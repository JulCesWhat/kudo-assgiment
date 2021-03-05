import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../state/app.state';
import { Store, select } from '@ngrx/store';
import { selectQuestions, selectQuestionById } from '../../state/questions.selectors';
import { Question } from 'src/app/data.models/question.model';
import { selectAuthedUser, } from 'src/app/state/authedUser.selectors';
import { selectUserByQuestionId } from '../../state/users.selectors';
import { ApiService } from '../../services/api.service';
import { addQuestionAnswer } from '../../state/questions.actions';
import { addUserQuestionAnswer } from '../../state/users.actions';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

    public question: Question | null = null;
    public answeredQuestion: boolean = false;
    public authedUser: any = null;
    public questionIdFromRoute: string = '';
    public userCreator: any = null;
    public userResponse: string = '';
    public totalVotes: number = 0;

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        this.questionIdFromRoute = routeParams.get('questionId') || '';

        console.log(this.questionIdFromRoute);
        if (this.questionIdFromRoute) {

        } else {

        }

        // Find the product that correspond with the id provided in route.
        // this.product = products.find(product => product.id === productIdFromRoute);

        this.store.select(selectQuestionById(this.questionIdFromRoute))
            .subscribe((question) => {
                if (question) {
                    this.question = question;
                    this.totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
                }
            });

        this.store.select(selectAuthedUser)
            .subscribe((authedUser) => {
                console.log('selectAuthedUser')
                console.log(authedUser)
                this.authedUser = authedUser;
                this.userResponse = authedUser?.answers[this.questionIdFromRoute] ? authedUser?.answers[this.questionIdFromRoute] : '';
            });

        this.store.select(selectUserByQuestionId(this.questionIdFromRoute))
            .subscribe((user) => {
                this.userCreator = user;
            });

    }

    public onClick(option: string) {
        const body = {
            authedUser: this.authedUser.id as string,
            qid: this.questionIdFromRoute,
            answer: option
        };

        this.apiService.saveQuestionAnswer({
            authedUser: this.authedUser.id as string,
            qid: this.questionIdFromRoute,
            answer: option
        }).then((res) => {
            this.store.dispatch(addQuestionAnswer({
                userId: this.authedUser.id,
                questionId: this.questionIdFromRoute,
                answerOption: option
            }));
            this.store.dispatch((addUserQuestionAnswer({
                userId: this.authedUser.id,
                questionId: this.questionIdFromRoute,
                answerOption: option
            })))
        }).catch((apiError) => {

        });
    }
}
