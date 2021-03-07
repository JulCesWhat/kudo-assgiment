import { createReducer, on, Action } from '@ngrx/store';
import { addQuestion, addQuestionAnswer, retrievedQuestionList } from '../actions/questions.actions';
import { Question } from '../../data.models/question.model';


export const initialState: { [key: string]: Question } = {};

export const questionsReducer = createReducer(
    initialState,
    on(retrievedQuestionList, (state, { questions }) => {
        return {
            ...state,
            ...questions
        };
    }),
    on(addQuestion, (state, { question }) => {
        const questionId = question.id;
        return {
            ...state,
            [questionId]: question
        };
    }),
    on(addQuestionAnswer, (state, { userId, question }) => {
        const questionId = question.id;
        return {
            ...state,
            [questionId]: {
                ...state[questionId],
                ...question
            }
        };
    })
);
