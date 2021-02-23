import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import AnswerButton from '../components/AnswerButton';
import { AxiosRequestConfig } from 'axios';
import { fetch } from '../common/fetch';
import { ipcReply, Question } from '../../types/common/index';
import { IpcRendererEvent } from 'electron';
import { registerIPCListeners } from '../common/ipc';

type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
};

type DependencyArray = {
  data?: Array<Question>,
  questionNumber?: number
}[]

const IndexPage = () => {
  const [data, setData] = useState<Array<Question>>([]);
  const [questionNumber, setNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const incrementNumber = (): void => {
    setNumber(questionNumber + 1);
  };

  const getQuestions = async (): Promise<void> => {
    try {
      const request: AxiosRequestConfig = {
        url: 'http://localhost:8000/questions'
      };
      const data = await fetch<Array<Question>>(request);
      setData(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const updateAnswers = (): void => {
    if (data.length !== 0) {
      const tmp: Answer[] = data[questionNumber].incorrect_answers.map(
        (i: string, index: number) => ({
          id: index,
          text: i,
          isCorrect: false
        })
      );
      const correctAnswer: Answer = {
        id: data[questionNumber].incorrect_answers.length,
        text: data[questionNumber].correct_answer,
        isCorrect: true
      };
      tmp.push(correctAnswer);
      setAnswers(tmp);
      console.log(tmp);
    }
  };

  const isDataReady = (): boolean => {
    return data.length > 0 && answers.length > 0;
  };

  const openAnswerWindowListener = (_event: IpcRendererEvent, reply: ipcReply): void => {
    console.log(reply);
  };

  useEffect(() => {
    getQuestions();
    registerIPCListeners<ipcReply>(
      'open-window-reply',
      openAnswerWindowListener
    );
    return () => {};
  }, []);

  useEffect(
    () => {
      updateAnswers();
      return () => {};
    },
    [data, questionNumber] as DependencyArray
  );

  return (
    <Layout title="Questions and Answer app">
      <h1>{'Questions & Answers'}</h1>
      <img
        className="logo"
        src="https://cdn.worldvectorlogo.com/logos/who-wants-to-be-a-millionaire.svg"
        alt="logo"
      />
      <img
        className="bg"
        src="https://onwardigo.files.wordpress.com/2016/05/millionaire01.jpg"
        alt="background"
      />
      {isDataReady() && (
        <div>
          <div className="question-btn">
            {'Question ' + (questionNumber + 1) + '. '}
            {data[questionNumber].question}
          </div>
          <div className="answers">
            {shuffle(answers).map(({ text, isCorrect }: Answer) => (
              <AnswerButton
                key={text}
                text={text}
                isCorrect={isCorrect}
                questionNumber={questionNumber}
                incrementNumber={incrementNumber}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

function shuffle (array: Array<Answer>): Array<Answer> {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * i);
    const temp: Answer = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default IndexPage;
