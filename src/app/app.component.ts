import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Store, select } from '@ngrx/store';
import { retrievedQuestionList } from './state/questions.actions';
import { selectQuestions } from './state/questions.selectors'
import { AppState } from './state/app.state'
import { Question } from './modals/question.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'kudo-assgiment';

    books$ = this.store.pipe(select(selectQuestions));

    constructor(
        private apiService: ApiService,
        private store: Store<AppState>
    ) {

    }

    ngOnInit() {
        this.apiService.getInitialData()
            .then((response: any) => {
                this.store.dispatch(retrievedQuestionList({questions: response.questions}));
            }).catch((apiError) => {

            });

        this.store.select(selectQuestions)
            .subscribe((item) => {
                console.log(item)
            });
    }

}
