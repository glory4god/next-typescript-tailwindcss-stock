import React from 'react';
import { GetServerSideProps } from 'next';
import Subnavbar from '../../../components/common/Subnavbar';
import Container from '../../../components/ui/Container';
import type { ChartReport } from '../../../types/report/ReportType';
import fetcher from '../../../lib/fetcher';
import BoardList from '../../../components/report/BoardList';

const Total = ({ report }: { report: Array<ChartReport> }) => {
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'total', second: 'company', third: 'my' },
        }}
      />
      <h2 className="my-4">CHART REPORT</h2>
      <BoardList report={report} entire={true} />
    </Container>
  );
};

export default React.memo(Total);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const report = (await fetcher(
    process.env.AWS_SERVER + 'api/v1/user/chart-report',
  )) as Array<ChartReport>;
  return {
    props: { report },
  };
};
