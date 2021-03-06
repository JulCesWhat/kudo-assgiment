import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/data.models/user.model';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    @Input() user: User | null = null;
    public answeredQuestions: number = 0;
    public questions: number = 0;
    public totalScore: number = 0;

    constructor() { }

    ngOnInit(): void {
        this.answeredQuestions = this.user ? Object.keys(this.user?.answers).length : 0;
        this.questions = this.user ? this.user.questions.length : 0;
        this.totalScore = this.answeredQuestions + this.questions;
    }

}
