// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import { ipcArgurments } from '../../types/common/index';
import { sendIPCMessage } from '../common/ipc';

type Props = {
  questionNumber: number;
  text: string;
  isCorrect: boolean;
  incrementNumber: () => void;
};

const AnswerButton = ({
  questionNumber,
  text,
  isCorrect,
  incrementNumber
}: Props) => {
  const [display, setDisplay] = useState(false);
  const onClickHandler = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const channelName: string = 'open-window';
    const message: ipcArgurments = {
      questionNumber: questionNumber,
      isCorrect: isCorrect,
      text: text
    };
    sendIPCMessage<ipcArgurments>(channelName, message);
    if (isCorrect) incrementNumber();
    else setDisplay(true);
  };

  return (
    <button
      className="answers-btn"
      onClick={onClickHandler}
      style={{ opacity: display ? '0.0' : '1.0' }}
    >
      {text}
    </button>
  );
};

export default AnswerButton;
