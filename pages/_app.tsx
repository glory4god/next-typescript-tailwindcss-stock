import React from 'react';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Menubar from '../components/common/Navbar';
import Head from '../components/common/Head';
import Layout from '../components/common/Layout';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
