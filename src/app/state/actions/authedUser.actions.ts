import { createAction, props } from '@ngrx/store';


export const setAuthedUser = createAction(
    '[User] User Authenticated Success',
    props<{ userId: string }>()
);

export const resetAuthedUser = createAction(
    '[User] User Logged Out Success',
);

export const redirect = createAction(
    '[Reroute] Reroute',
    props<{ route: string }>()
);

export const getInitialData = createAction(
    '[Users and Questions] Setting Initial Users and Questions',
);
