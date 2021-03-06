import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/data.models/question.model';
import { User } from 'src/app/data.models/user.model';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

    @Input() questions: Question[] | null = [];
    @Input() users: { [key: string]: User } | null = null;
    @Output() onClicked: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    public questionClicked(id: string) {
        this.onClicked.emit(id);
    }

}
