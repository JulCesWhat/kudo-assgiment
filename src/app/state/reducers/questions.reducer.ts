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
    on(addQuestionAnswer, (state, { questionId, userId, answerOption }) => {
        const question = state[questionId] as Question;
        let body = {};
        if (answerOption === 'optionOne') {
            body = {
                ...question.optionOne,
                votes: [...question.optionOne.votes, userId]
            };
        } else {
            body = {
                ...question.optionTwo,
                votes: [...question.optionTwo.votes, userId]
            }
        }
        return {
            ...state,
            [questionId]: {
                ...state[questionId],
                [answerOption]: {
                    ...body
                }
            }
        };
    })
);
