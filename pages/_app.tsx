// import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

// import store from '@/store';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
