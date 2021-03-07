import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from '../app.state';
import { Question } from '../../data.models/question.model';

export const selectQuestions = createSelector(
    (state: AppState) => state.questions,
    (questions: { [key: string]: Question }) => questions
);

export const selectQuestionById = (id: string) => createSelector(
    selectQuestions,
    (allQuestions: { [key: string]: Question }) => {
        if (allQuestions) {
            const questionId = Object.keys(allQuestions).find((questionId: string) => (questionId === id));
            if (questionId) {
                return allQuestions[questionId];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
);
