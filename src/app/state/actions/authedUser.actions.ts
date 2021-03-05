import { createAction, props } from '@ngrx/store';


export const setAuthedUser = createAction(
    '[Questions Object/API] Retrieve Questions Success',
    props<{ userId: string }>()
);
