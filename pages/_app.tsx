import React from 'react';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Head from '../components/common/Head';
import Layout from '../components/common/Layout';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../lib/redux/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
