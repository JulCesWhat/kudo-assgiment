import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { selectUsers } from './users.selectors';
import { selectQuestions, selectQuestionById } from './questions.selectors';
import { User } from '../data.models/user.model';
import { Question } from "../data.models/question.model";


export const selectAuthedUser = createSelector(
    (state: AppState) => state.authedUser,
    selectUsers,
    (authedUser: string, users: { [key: string]: User }) => {
        if (authedUser && Object.keys(users).length) {
            return users[authedUser];
        } else {
            return null;
        }
    }
);

export const selectAnsweredQuestion = createSelector(
    (state: AppState) => state.authedUser,
    selectQuestions,
    (authedUser: string, questions: { [key: string]: Question }) => {
        if (authedUser && Object.keys(questions).length) {
            const answered = Object.keys(questions)
                .map((questionId) => (questions[questionId]))
                .filter((question) => {
                    return ((question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)))
                })
                .sort((a, b) => (b.timestamp - a.timestamp));
            return answered || [];
        } else {
            return [];
        }
    }
);

export const selectUnansweredQuestion = createSelector(
    (state: AppState) => state.authedUser,
    selectQuestions,
    (authedUser: string, questions: { [key: string]: Question }) => {
        if (authedUser && Object.keys(questions).length) {
            const unanswered = Object.keys(questions)
                .map((questionId) => (questions[questionId]))
                .filter((question) => {
                    return ((!question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser)))
                })
                .sort((a, b) => (b.timestamp - a.timestamp));
            return unanswered || [];
        } else {
            return [];
        }
    }
);

// export const selectAuthedUserQuestions = (id: string) => createSelector(
//     (state: AppState) => state.authedUser,
//     selectQuestionById(id),
//     (authedUser: string, question: Question) => {
//         // if (authedUser && Object.keys(questions).length) {
//         //     return {
//         //         authedUser,
//         //         questions
//         //     }
//         // } else {
//         //     return null;
//         // }
//     }
// );
