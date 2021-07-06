import React from 'react';
import { GetServerSideProps } from 'next';
import Subnavbar from '../../../components/common/Subnavbar';
import Container from '../../../components/ui/Container';
import type { ChartReport } from '../../../types/report/ReportType';
import fetcher from '../../../lib/fetcher';
import BoardContent from '../../../components/report/BoardContent';

const Total = ({ report }: { report: Array<ChartReport> }) => {
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'total', second: 'company', third: 'my' },
        }}
      />
      <h2 className="mt-6">CHART REPORT</h2>
      <div>
        {report.map((arr, idx) => {
          return <BoardContent key={arr.username + idx} item={arr} />;
        })}
      </div>
    </Container>
  );
};

export default Total;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const report = (await fetcher(
    'http://localhost:8080/api/v1/user/chart-report',
  )) as Array<ChartReport>;
  return {
    props: { report },
  };
};
