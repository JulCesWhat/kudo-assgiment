import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { ApiService } from './services/api.service';

import { questionsReducer } from './state/reducers/questions.reducer';
import { usersReducer } from './state/reducers/users.reducer';
import { authedUserReducer } from './state/reducers/authedUser.reducer'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModalComponent } from './modals/auth.modal/auth.modal.component';
import { QuestionListComponent } from './views/dashboard/question-list/question-list.component';
import { QuestionComponent } from './views/question/question.component';
import { AddQuestionComponent } from './views/add-question/add-question.component';
import { UserDetailsComponent } from './views/leaderboard/user-details/user-details.component';
import { QuestionsEffects } from './state/effetcs/questions.effects';

@NgModule({
    declarations: [
        AppComponent,
        LeaderboardComponent,
        NotfoundComponent,
        DashboardComponent,
        HeaderComponent,
        AuthModalComponent,
        QuestionListComponent,
        QuestionComponent,
        AddQuestionComponent,
        UserDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({ users: usersReducer, questions: questionsReducer, authedUser: authedUserReducer }, {}),
        EffectsModule.forRoot([QuestionsEffects]),
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
