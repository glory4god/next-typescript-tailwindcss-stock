import React from 'react';
import Container from '../../../components/ui/Container';
import Subnavbar from '../../../components/common/Subnavbar';
import { GetStaticPaths, GetStaticProps } from 'next';
import type { ChartReport } from '../../../types/report/ReportType';
import { getReportById, getReportIds } from '../../../lib/report';
import { ParsedUrlQuery } from 'querystring';
import BoardView from '../../../components/report/BoardView';
import { useSelector } from 'react-redux';
import { selectReport } from '../../../components/report/reportSlice';

const BoardPage = ({ report }: { report: ChartReport }) => {
  const { reportList } = useSelector(selectReport);
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'free', second: 'chart', third: 'my' },
        }}
      />
      <h2 className="my-4">CHART REPORT</h2>
      <BoardView
        className="text-left"
        report={report}
        reportList={reportList}
      />
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
  const report = (await getReportById(pages)) as ChartReport;

  return {
    props: { report },
  };
};
