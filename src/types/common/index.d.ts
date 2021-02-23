/* eslint-disable no-unused-vars */
export interface ipcArgurments {
  readonly questionNumber: number;
  readonly isCorrect: boolean;
  readonly text: string
}

export interface ipcReply {
  readonly text: string;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  // eslint-disable-next-line camelcase
  correct_answer: string;
  // eslint-disable-next-line camelcase
  incorrect_answers: Array<string>;
}
