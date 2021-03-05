import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    @Input() user: any;
    public answeredQuestions: number = 0;
    public questions: number = 0;
    public totalScore: number = 0;

    constructor() { }

    ngOnInit(): void {
        this.answeredQuestions = Object.keys(this.user?.answers).length;
        this.questions = this.user.questions.length;
        this.totalScore = this.answeredQuestions + this.questions;
    }

}
