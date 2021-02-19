import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import AnswerButton from '../components/AnswerButton';

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  // eslint-disable-next-line camelcase
  correct_answer: string;
  // eslint-disable-next-line camelcase
  incorrect_answers: Array<string>;
};

type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
};

const IndexPage = () => {
  const [data, setData] = useState<Array<Question>>([]);
  const [questionNumber, setNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<Answer>>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8000/questions');
        const json = await response.json();
        setData(json as Array<Question>);
      } catch (error) {
        console.log(error);
      }
    })();
    global.ipcRenderer.addListener('open-window-reply', (_event, args) => {
      console.log(args);
    });
    return () => {};
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const tmp = data[questionNumber].incorrect_answers.map((i, index) => ({
      id: index,
      text: i,
      isCorrect: false
    }));
    tmp.push({
      id: data[questionNumber].incorrect_answers.length,
      text: data[questionNumber].correct_answer,
      isCorrect: true
    });
    setAnswers(tmp);
    return () => {};
  }, [data, questionNumber]);

  const incrementNumber = () => {
    setNumber(questionNumber + 1);
  };

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
      {data.length > 0 && answers.length > 0 && (
        <div>
          <div className="question-btn">
            {'Question ' + (questionNumber + 1) + '. '}
            {data[questionNumber].question}
          </div>
          <div className="answers">
            {shuffle(answers).map(({ text, isCorrect }) => (
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

function shuffle (array: Array<Answer>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default IndexPage;
