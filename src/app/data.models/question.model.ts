export interface Question {
    id: string;
    author: string;
    timestamp: number;
    optionOne: Option;
    optionTwo: Option;
}

export interface Option {
    votes: string[];
    text: string;
}

export interface SaveQuestionAnswer {
    question: Question,
    userId: string,
    answer: string
}
