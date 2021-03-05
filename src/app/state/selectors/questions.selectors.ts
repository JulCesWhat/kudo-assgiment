import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from '../app.state';
import { Question } from '../../data.models/question.model';

export const selectQuestions = createSelector(
    (state: AppState) => state.questions,
    (questions: { [key: string]: Question }) => questions
);

export const selectQuestionById = (id: string) => createSelector(
    selectQuestions,
    (allQuestions) => {
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

// export const selectCollectionState = createFeatureSelector<
//     AppState,
//     ReadonlyArray<String>
// >("collection");

// export const selectBookCollection = createSelector(
//     selectQuestions,
//     selectQuestionById(id),
//     // (books: Array<Question>, collection: Array<string>) => {
//     //     return collection.map((id) => books.find((book) => book.id === id));
//     // }
// );
