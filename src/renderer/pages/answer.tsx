import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { ipcArgurments } from '../../types/common/index';
import { IpcRendererEvent } from 'electron';
import { registerIPCListeners, sendIPCMessage } from '../common/ipc';
import { AxiosRequestConfig } from 'axios';
import { fetch } from '../common/fetch';

type AnswerPageState = {
  answer: string;
  isCorrect: boolean;
  wrongAnswer: string;
}

const AnswerPage = () => {
  const [state, setState] = useState<AnswerPageState | null>(null);
  const [error, setError] = useState<any | null>(null);

  const getState = async (initialData: ipcArgurments): Promise<void> => {
    try {
      const request: AxiosRequestConfig = {
        url: 'http://localhost:8000/answer/' + initialData.questionNumber
      };
      const answer: string = await fetch<string>(request);
      const initialState: AnswerPageState = {
        answer: answer,
        isCorrect: initialData.isCorrect,
        wrongAnswer: initialData.text
      };
      setState(initialState);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const questionIndexReplyListener = (
    _event: IpcRendererEvent,
    initialData: ipcArgurments
  ): void => {
    getState(initialData);
  };

  const closeWindow = (): void => {
    const channelName: string = 'close-window';
    const message: string = 'close';
    sendIPCMessage<string>(channelName, message);
  };

  useEffect(() => {
    registerIPCListeners<ipcArgurments>(
      'question-index-reply',
      questionIndexReplyListener
    );
    setTimeout(closeWindow, 3000);
    return () => { };
  }, []);

  const renderState = (CurrentState: AnswerPageState | null) => {
    if (CurrentState) {
      return (
        <div>
          <h1 className="answer">
            {CurrentState.isCorrect
              ? CurrentState.answer
              : CurrentState.wrongAnswer}{' '}
            <br />
            is
          </h1>
          {CurrentState.isCorrect
            ? (
            <img
              className="gif"
              src="https://media1.tenor.com/images/fc7c5f7bcde56027cfeb6fa44b7ff240/tenor.gif?itemid=8281757"
              alt="gif"
            />
              )
            : (
            <img
              className="gif"
              src="https://media1.tenor.com/images/5dffa6d7387e6ecac25c42a95151ab2a/tenor.gif?itemid=6084689"
              alt="gif"
            />
              )}
        </div>
      );
    } else {
      return <h1>{error ? JSON.stringify(error) : 'Loading'}</h1>;
    }
  };

  return <Layout title="Answer page">{renderState(state)}</Layout>;
};

export default AnswerPage;
