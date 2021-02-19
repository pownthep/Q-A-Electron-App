import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const AnswerPage = () => {
  const [answer, setAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<string>('');
  const getAnswer = async (index: number) => {
    try {
      const response = await fetch('http://localhost:8000/answer/' + index);
      const data = await response.text();
      setAnswer(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    global.ipcRenderer.addListener('question-index-reply', (_event, args) => {
      getAnswer(args[0]);
      setIsCorrect(args[1]);
      setWrongAnswer(args[2]);
    });
    return () => {};
  }, []);
  return (
    <Layout title="Answer page">
      <h1 className="answer">
        {isCorrect !== null && isCorrect ? answer : wrongAnswer} <br />
        is
      </h1>
      {isCorrect !== null && isCorrect
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
    </Layout>
  );
};

export default AnswerPage;
