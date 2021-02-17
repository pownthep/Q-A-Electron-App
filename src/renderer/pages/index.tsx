import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

const IndexPage = () => {
  const [data, setData] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8000/questions');
        const data = await response.json();
        setData(data as Array<string>);
      } catch (error) {
        console.log(error);
      }
    })();
    global.ipcRenderer.addListener('open-window-reply', (_event, args) => {
      console.log(args);
    });
    return () => {};
  }, []);

  return (
    <Layout title="Questions and Answer app">
      {data.map((question: string, index: number) => (
        <button
          key={question}
          onClick={() => {
            global.ipcRenderer.send('open-window', index);
          }}
        >
          {question}
        </button>
      ))}
    </Layout>
  );
};

export default IndexPage;
