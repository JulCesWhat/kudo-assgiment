import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { ApiService } from './services/api.service';

import { questionsReducer } from './state/questions.reducer';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaderboardComponent } from './views/leaderboard/leaderboard.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        LeaderboardComponent,
        NotfoundComponent,
        DashboardComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({ questions: questionsReducer }, {}),
    ],
    providers: [
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
