import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { from, Observable } from 'rxjs';
import { Question, SaveQuestionAnswer } from '../data.models/question.model';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private users: any = {
        rashmi: {
            id: "rashmi",
            name: "Rashmi Manandhar",
            avatarURL: "https://placekitten.com/200/302",
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
            avatarURL: "https://placekitten.com/200/301",
            answers: {
                "vthrdm985a262al8qx3do": "optionOne",
                "xj352vofupe1dqz9emx13r": "optionTwo"
            },
            questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"]
        },
        johndoe: {
            id: "johndoe",
            name: "John Doe",
            avatarURL: "https://placekitten.com/200/300",
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
        const { userId, optionOneText, optionTwoText } = question;
        return {
            id: this.generateUid(),
            timestamp: Date.now(),
            author: userId,
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
            const { userId } = question;
            const formattedQuestion = this.formatQuestion(question);
            const user = this.users[userId];

            setTimeout(() => {
                this.questions = {
                    ...this.questions,
                    [formattedQuestion.id]: formattedQuestion
                };

                this.users = {
                    ...this.users,
                    [userId]: {
                        ...user,
                        questions: user.questions.concat([formattedQuestion.id])
                    }
                };

                res(formattedQuestion)
            }, 1000);
        });
    }

    private _saveQuestionAnswer(questionAnswer: any): Promise<SaveQuestionAnswer> {
        return new Promise((res, rej) => {
            const { userId, questionId, answer } = questionAnswer;
            const user = this.users[userId];

            setTimeout(() => {

                this.users = {
                    ...this.users,
                    [userId]: {
                        ...user,
                        answers: {
                            ...user.answers,
                            [questionId]: answer
                        }
                    }
                }

                this.questions = {
                    ...this.questions,
                    [questionId]: {
                        ...this.questions[questionId],
                        [answer]: {
                            ...this.questions[questionId][answer],
                            votes: this.questions[questionId][answer].votes.concat([userId])
                        }
                    }
                }

                res({
                    answer: answer,
                    userId: userId,
                    question:  {
                        ...this.questions[questionId],
                        [answer]: {
                            ...this.questions[questionId][answer],
                            votes: this.questions[questionId][answer].votes.concat([userId])
                        }
                    }
                });
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

    public saveQuestion(question: any): Observable<Question> {
        return from(this._saveQuestion(question));
    }

    public saveQuestionAnswer(questionAnswer: any): Observable<SaveQuestionAnswer> {
        return from(this._saveQuestionAnswer(questionAnswer));
    }
}
