import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const AnswerPage = () => {
  const [answer, setAnswer] = useState<string>('');

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
      getAnswer(args);
      console.log(answer);
    });
    return () => {};
  }, []);
  return <Layout title="Answer page">{answer}</Layout>;
};

export default AnswerPage;
