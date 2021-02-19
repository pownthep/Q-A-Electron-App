// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react';

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
  const [clicked, setClicked] = useState(false);

  return (
    <>
    {
      clicked
        ? (
        <div></div>
          )
        : (
        <button
          className="animated animatedFadeInUp fadeInUp answers-btn"
          onClick={() => {
            global.ipcRenderer.send('open-window', [
              questionNumber,
              isCorrect,
              text
            ]);
            if (isCorrect) incrementNumber();
            else setClicked(true);
          }}
        >
          {text}
        </button>
          )}
      </>
  );
};

export default AnswerButton;
