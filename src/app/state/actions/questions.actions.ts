import { createAction, props } from '@ngrx/store';
import { Question } from '../../data.models/question.model';


export const addQuestion = createAction(
    '[Questions Object] Add Question',
    props<{ question: Question }>()
);

export const addQuestionAnswer = createAction(
    '[Questions Object] Add Question Answer',
    props<{ questionId: string, userId: string, answerOption: string }>()
)

export const retrievedQuestionList = createAction(
    '[Questions Object/API] Retrieve Questions Success',
    props<{ questions: { [key: string]: Question } }>()
);
