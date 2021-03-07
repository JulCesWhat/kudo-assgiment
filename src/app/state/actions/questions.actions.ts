import { createAction, props } from '@ngrx/store';
import { Question } from '../../data.models/question.model';


export const addQuestion = createAction(
    '[Questions Object] Add Question',
    props<{ question: Question }>()
);

export const addQuestionAnswer = createAction(
    '[Questions Object] Add Question Answer',
    props<{ userId: string, question: Question }>()
);

export const retrievedQuestionList = createAction(
    '[Questions Object/API] Retrieve Questions Success',
    props<{ questions: { [key: string]: Question } }>()
);

export const saveQuestion = createAction(
    '[Questions Object] Save Question',
    props<{ userId: string, optionOneText: string, optionTwoText: string }>()
);

export const saveQuestionAnswer = createAction(
    '[Questions Object] Save Question Answer',
    props<{ userId: string, questionId: string, answer: string }>()
);
