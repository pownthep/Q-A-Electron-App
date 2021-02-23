// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';
import { ipcArgurments } from '../../types/common/index';

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
  return (
    <button
      className="answers-btn"
      onClick={() => {
        global.ipcRenderer.send('open-window', {
          questionNumber: questionNumber,
          isCorrect: isCorrect,
          text: text
        } as ipcArgurments);
        if (isCorrect) incrementNumber();
        else setDisplay(true);
      }}
      style={{ opacity: display ? '0.0' : '1.0' }}
    >
      {text}
    </button>
  );
};

export default AnswerButton;
