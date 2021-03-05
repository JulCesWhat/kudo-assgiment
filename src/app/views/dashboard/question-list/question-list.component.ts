import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/data.models/question.model';

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

    @Input() questions: any;
    @Output() onClicked: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    public questionClicked(id: string) {
        this.onClicked.emit(id);
    }

}
