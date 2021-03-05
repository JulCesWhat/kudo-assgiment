import { createReducer, on, Action } from '@ngrx/store';
import { setAuthedUser } from './authedUser.actions';


export const initialState: string = '';

export const authedUserReducer = createReducer(
    initialState,
    on(setAuthedUser, (state, { userId }) => {
        return userId
    })
);
