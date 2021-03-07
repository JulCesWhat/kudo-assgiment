import { createReducer, on, Action } from '@ngrx/store';
import { setAuthedUser, resetAuthedUser } from '../actions/authedUser.actions';


export const initialState: string = '';

export const authedUserReducer = createReducer(
    initialState,
    on(setAuthedUser, (state, { userId }) => {
        return userId
    }),
    on(resetAuthedUser, (state) => {
        return '';
    })
);
