import { createAction, props } from '@ngrx/store';
import { User } from '../../data.models/user.model';


export const setAuthedUser = createAction(
    '[Questions Object/API] Retrieve Questions Success',
    props<{ userId: string }>()
);

export const retrievedUserList = createAction(
    '[User Object/API] Retrieve User Success',
    props<{ users: { [key: string]: User } }>()
);

export const addUserQuestion = createAction(
    '[User Object] Add User Question',
    props<{ userId: string, questionId: string }>()
);

export const addUserQuestionAnswer = createAction(
    '[User Object] Add User Question Answer',
    props<{ userId: string, questionId: string, answerOption: string }>()
);
