import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

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
        path: '**',
        component: NotfoundComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
