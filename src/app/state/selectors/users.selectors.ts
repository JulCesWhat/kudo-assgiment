import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from '../app.state';
import { User } from '../../data.models/user.model';


export const selectUsers = createSelector(
    (state: AppState) => state.users,
    (users: { [key: string]: User }) => users
);


export const selectUserByQuestionId = (id: string) => createSelector(
    selectUsers,
    (allUsers) => {
        if (allUsers) {
            const userId = Object.keys(allUsers).find((userId: string) => {
                return allUsers[userId].questions.includes(id);
            });
            if (userId) {
                return allUsers[userId];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
);

export const selectSortedUsers = createSelector(
    selectUsers,
    (users: { [key: string]: User }) => {
        if (Object.keys(users).length) {
            const sortedUsers = Object.keys(users)
                .sort((a, b) => {
                    let userB = Object.keys(users[b].answers).length + users[b].questions.length;
                    let userA = Object.keys(users[a].answers).length + users[a].questions.length;
                    return userB - userA;
                }).map((id) => (users[id]))
            return sortedUsers;
        } else {
            return [];
        }
    }
)
