import React from 'react';
import Container from '../../../components/ui/Container';
import Subnavbar from '../../../components/common/Subnavbar';
import { GetStaticPaths, GetStaticProps } from 'next';
import type { ChartReport } from '../../../types/report/ReportType';
import { getReportById, getReportIds } from '../../../lib/report';
import { ParsedUrlQuery } from 'querystring';

const BoardPage = ({ data }: { data: ChartReport }) => {
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'total', second: 'company', third: 'my' },
        }}
      />
      <div>
        <div>{data.report.title}</div>
        <div>{data.report.content}</div>
        <div>{data.username}</div>
      </div>
    </Container>
  );
};

export default BoardPage;

//이 과정이 사실 정확히 뭔지는 모르겠지만 빨간줄이 안뜸 ㅠㅠ
interface IParams extends ParsedUrlQuery {
  pages: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const arr = (await getReportIds()) as string[];
  const paths = arr.map((pages) => {
    return {
      params: { pages },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { pages } = context.params as IParams;
  const data = (await getReportById(pages)) as ChartReport;

  return {
    props: { data },
  };
};
