import React from 'react';
import PopularViews from '../../components/news/PopularViews';
import SearchBar from '../../components/news/SearchBar';
import Head from 'next/head';
import Container from '../../components/ui/Container';

import { GetServerSideProps } from 'next';
import fetcher from '../../lib/fetcher';
import TopicContainer from '../../components/news/Topic';

export default function News({ topic }: { topic: Array<string> }) {
  return (
    <Container>
      <Head>
        <title>TITLE-NEWS</title>
      </Head>
      <div className="md:mt-6 mt-2 md:flex md:space-x-4">
        <div className="md:w-3/4">
          <SearchBar topic={topic} />
          <TopicContainer className="md:mt-10 mt-6" topic={topic} />
        </div>
        <div className="md:w-1/4 ">
          <PopularViews className=" space-y-2" />
        </div>
      </div>
    </Container>
  );
}

// 한 번 fetch 하면 그 뒤로는 fetch를 안함!!
// serverside는 계속 fetch 보내는 다른 점이 있음!!
// export const getStaticProps: GetStaticProps = async (context) => {
//   // const res = (await fetcher(
//   //   'http://54.180.68.136:8080/api/v1/news/pop-keyword/weekly',
//   // )) as Array<string>;

//   // const topic = res.filter((arr, idx) => {
//   //   if (idx < 10) {
//   //     return arr;
//   //   }
//   // });

//   return {
//     props: {
//       // topic,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = (await fetcher(
    process.env.AWS_SERVER + 'api/v1/news/pop-keyword/weekly',
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  )) as Array<string>;

  const topic = res.filter((arr, idx) => {
    if (idx < 10) {
      return arr;
    }
  });

  return {
    props: {
      topic,
    },
  };
};
