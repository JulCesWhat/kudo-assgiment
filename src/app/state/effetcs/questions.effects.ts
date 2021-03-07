import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { redirect } from '../actions/authedUser.actions';
import { saveQuestion, addQuestion, saveQuestionAnswer, addQuestionAnswer, retrievedQuestionList } from '../actions/questions.actions';
import { addUserQuestion, addUserQuestionAnswer, retrievedUserList } from '../actions/users.actions';
import { getInitialData } from '../actions/authedUser.actions';
import { Router } from '@angular/router';

@Injectable()
export class QuestionsEffects {

    saveQuestionEffect$ = createEffect(() => this.actions$.pipe(
        ofType(saveQuestion),
        mergeMap((action) => this.apiService.saveQuestion(action)
            .pipe(
                switchMap(question => [
                    addQuestion({ question }),
                    addUserQuestion({ userId: question.author, questionId: question.id }),
                    redirect({ route: '/home' })
                ]),
                catchError(() => EMPTY)
            ))
    )
    );

    saveQuestionAnswerEffect$ = createEffect(() => this.actions$.pipe(
        ofType(saveQuestionAnswer),
        mergeMap((action) => this.apiService.saveQuestionAnswer(action)
            .pipe(
                switchMap(saveQuestionAnswer => [
                    addQuestionAnswer({ userId: saveQuestionAnswer.userId, question: saveQuestionAnswer.question }),
                    addUserQuestionAnswer({ userId: saveQuestionAnswer.userId, questionId: saveQuestionAnswer.question.id, answerOption: saveQuestionAnswer.answer })
                ]),
                catchError(() => EMPTY)
            ))
    ));

    getInitialDataEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getInitialData),
        mergeMap((action) => this.apiService.getInitialData()
            .pipe(
                switchMap(response => [
                    retrievedQuestionList({ questions: response.questions }),
                    retrievedUserList({ users: response.users })
                ]),
                catchError(() => EMPTY)
            ))
    ));

    rerouteSuccessEffect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(redirect),
                tap((action) => {
                    this.router.navigate([action.route]);
                })
            ),
        { dispatch: false }
    );


    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private router: Router
    ) { }
}
