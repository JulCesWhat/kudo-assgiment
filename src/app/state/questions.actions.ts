import { createAction, props } from '@ngrx/store';
import { Question } from '../modals/question.model';

export const addQuestion = createAction(
    '[Questions Object] Add Question',
    props<{ questionId: string, question: Question }>()
);

// export const removeBook = createAction(
//     '[Book Collection] Remove Book',
//     props<{ bookId }>()
// );

export const retrievedQuestionList = createAction(
    '[Questions Object/API] Retrieve Questions Success',
    props<{ questions: { [key: string]: Question } }>()
);
