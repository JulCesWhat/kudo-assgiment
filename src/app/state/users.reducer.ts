import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../data.models/user.model';
import { retrievedUserList, addUserQuestion, addUserQuestionAnswer } from './users.actions';


export const initialState: { [key: string]: User } = {};

export const usersReducer = createReducer(
    initialState,
    on(retrievedUserList, (state, { users }) => {
        return {
            ...state,
            ...users
        }
    }),
    on(addUserQuestion, (state, { userId, questionId }) => {
        return {
            ...state,
            [userId]: {
                ...state[userId],
                questions: [...state[userId].questions, questionId]
            }
        };
    }),
    on(addUserQuestionAnswer, (state, { userId, questionId, answerOption }) => {
        return {
            ...state,
            [userId]: {
                ...state[userId],
                answers: {
                    ...state[userId].answers,
                    [questionId]: answerOption
                }
            }
        };
    })
);
