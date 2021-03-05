import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { Question } from '../data.models/question.model';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private users: any = {
        rashmi: {
            id: "rashmi",
            name: "Rashmi Manandhar",
            avatarURL: "",
            answers: {
                "8xf0y6ziyjabvozdd253nd": "optionOne",
                "6ni6ok3ym7mf1p33lnez": "optionTwo",
                "am8ehyc8byjqgar0jgpub9": "optionTwo",
                "loxhs1bqm25b708cmbf3g": "optionTwo"
            },
            questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"]
        },
        julian: {
            id: "julian",
            name: "Julian Manandhar",
            avatarURL: "",
            answers: {
                "vthrdm985a262al8qx3do": "optionOne",
                "xj352vofupe1dqz9emx13r": "optionTwo"
            },
            questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"]
        },
        johndoe: {
            id: "johndoe",
            name: "John Doe",
            avatarURL: "",
            answers: {
                "xj352vofupe1dqz9emx13r": "optionOne",
                "vthrdm985a262al8qx3do": "optionTwo",
                "6ni6ok3ym7mf1p33lnez": "optionTwo"
            },
            questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"]
        }
    };

    private questions: any = {
        "8xf0y6ziyjabvozdd253nd": {
            id: "8xf0y6ziyjabvozdd253nd",
            author: "rashmi",
            timestamp: 1467166872634,
            optionOne: {
                votes: ["rashmi"],
                text: "have horrible short term memory"
            },
            optionTwo: {
                votes: [],
                text: "have horrible long term memory"
            }
        },
        "6ni6ok3ym7mf1p33lnez": {
            id: "6ni6ok3ym7mf1p33lnez",
            author: "johndoe",
            timestamp: 1468479767190,
            optionOne: {
                votes: [],
                text: "become a superhero"
            },
            optionTwo: {
                votes: ["johndoe", "rashmi"],
                text: "become a supervillain"
            }
        },
        am8ehyc8byjqgar0jgpub9: {
            id: "am8ehyc8byjqgar0jgpub9",
            author: "rashmi",
            timestamp: 1488579767190,
            optionOne: {
                votes: [],
                text: "be telekinetic"
            },
            optionTwo: {
                votes: ["rashmi"],
                text: "be telepathic"
            }
        },
        loxhs1bqm25b708cmbf3g: {
            id: "loxhs1bqm25b708cmbf3g",
            author: "julian",
            timestamp: 1482579767190,
            optionOne: {
                votes: [],
                text: "be a front-end developer"
            },
            optionTwo: {
                votes: ["rashmi"],
                text: "be a back-end developer"
            }
        },
        vthrdm985a262al8qx3do: {
            id: "vthrdm985a262al8qx3do",
            author: "julian",
            timestamp: 1489579767190,
            optionOne: {
                votes: ["julian"],
                text: "find $50 yourself"
            },
            optionTwo: {
                votes: ["johndoe"],
                text: "have your best friend find $500"
            }
        },
        xj352vofupe1dqz9emx13r: {
            id: "xj352vofupe1dqz9emx13r",
            author: "johndoe",
            timestamp: 1493579767190,
            optionOne: {
                votes: ["johndoe"],
                text: "write JavaScript"
            },
            optionTwo: {
                votes: ["julian"],
                text: "write Swift"
            }
        }
    };

    constructor() { }

    private generateUid() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private _getUsers() {
        return new Promise((res, rej) => {
            setTimeout(() => res({ ...this.users }), 1000);
        });
    }

    private _getQuestions() {
        return new Promise((res, rej) => {
            setTimeout(() => res({ ...this.questions }), 1000);
        });
    }

    private formatQuestion(question: any): Question {
        const { author, optionOneText, optionTwoText } = question;
        return {
            id: this.generateUid(),
            timestamp: Date.now(),
            author: author,
            optionOne: {
                votes: [],
                text: optionOneText,
            },
            optionTwo: {
                votes: [],
                text: optionTwoText,
            }
        };
    }

    private _saveQuestion(question: any): Promise<Question> {
        return new Promise((res, rej) => {
            const { author: authedUser } = question;
            const formattedQuestion = this.formatQuestion(question);
            const user = this.users[authedUser];

            setTimeout(() => {
                this.questions = {
                    ...this.questions,
                    [formattedQuestion.id]: formattedQuestion
                };

                this.users = {
                    ...this.users,
                    [authedUser]: {
                        ...user,
                        questions: user.questions.concat([formattedQuestion.id])
                    }
                };

                res(formattedQuestion)
            }, 1000);
        });
    }

    private _saveQuestionAnswer(questionAnswer: any) {
        return new Promise((res, rej) => {
            const { authedUser, qid, answer } = questionAnswer;
            const user = this.users[authedUser];

            setTimeout(() => {

                this.users = {
                    ...this.users,
                    [authedUser]: {
                        ...user,
                        answers: {
                            ...user.answers,
                            [qid]: answer
                        }
                    }
                }

                this.questions = {
                    ...this.questions,
                    [qid]: {
                        ...this.questions[qid],
                        [answer]: {
                            ...this.questions[qid][answer],
                            votes: this.questions[qid][answer].votes.concat([authedUser])
                        }
                    }
                }

                res('');
            }, 500)
        });
    }

    public getInitialData() {
        return Promise.all([
            this._getUsers(),
            this._getQuestions(),
        ]).then(([users, questions]) => ({
            users,
            questions,
        }));
    }

    public saveQuestion(question: any): Promise<Question> {
        return this._saveQuestion(question);
    }

    public saveQuestionAnswer(questionAnswer: any) {
        return this._saveQuestionAnswer(questionAnswer);
    }
}
