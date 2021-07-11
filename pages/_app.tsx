import React from 'react';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Head from '../components/common/Head';
import Layout from '../components/common/Layout';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </>
  );
}
