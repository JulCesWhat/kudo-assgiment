import { Question } from '../data.models/question.model';
import { User } from '../data.models/user.model';


export interface AppState {
    questions: { [key: string]: Question };
    users: { [key: string]: User };
    authedUser: string;
}
