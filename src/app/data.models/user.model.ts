export interface User {
    id: string;
    name: string;
    avatarURL: string;
    answers: Answers;
    questions: string[];
}

export interface Answers {
    [key: string]: string
}
