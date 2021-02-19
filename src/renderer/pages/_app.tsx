import { AppProps } from 'next/app';
import '../style.css';
import '../animation.css';

function App ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
