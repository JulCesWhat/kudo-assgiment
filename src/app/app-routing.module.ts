import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { QuestionComponent } from './views/question/question.component'
import { AddQuestionComponent } from './views/add-question/add-question.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: DashboardComponent,
    },
    {
        path: 'leaderboard',
        component: LeaderboardComponent,
    },
    {
        path: 'add',
        component: AddQuestionComponent,
    },
    {
        path: 'question/:questionId',
        component: QuestionComponent,
    },
    {
        path: '**',
        component: NotfoundComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
