import { createReducer, on, Action } from '@ngrx/store';

import { addQuestion, retrievedQuestionList } from './questions.actions';
import { Question } from '../modals/question.model';

export const initialState: { [key: string]: Question } = {};

export const questionsReducer = createReducer(
    initialState,
    on(addQuestion, (state, { questionId, question }) => {
        return {
            ...state,
            [questionId]: question
        }
    }),
    on(retrievedQuestionList, (state, { questions }) => {
        return {
            ...state,
            ...questions
        }
    })
);
