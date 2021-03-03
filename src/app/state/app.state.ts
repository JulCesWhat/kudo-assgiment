import { Question } from '../modals/question.model';
import { User } from '../modals/user.model';

export interface AppState {
    questions: { [key: string]: Question };
    // users: Array<User>;
}
