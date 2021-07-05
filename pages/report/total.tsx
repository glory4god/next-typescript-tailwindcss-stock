import React from 'react';
import { GetStaticProps } from 'next';
import Subnavbar from '../../components/common/Subnavbar';
import Container from '../../components/ui/Container';
import type { ChartReport } from '../../types/report/ReportType';
import fetcher from '../../lib/fetcher';

const Total = ({ report }: { report: Array<ChartReport> }) => {
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'report',
          sub: { first: 'total', second: 'company', third: 'my' },
        }}
      />
      <h2>CHART REPORT</h2>
      {report.map((arr, idx) => {
        return (
          <div key={idx}>
            <div>{arr.id}</div>
            <div>{arr.username}</div>
            <h2>{arr.report.title}</h2>
            <p>{arr.report.content}</p>
            <div>{arr.report.modifiedDate}</div>
            <div>{arr.report.good}</div>
            <div>{arr.report.bad}</div>
          </div>
        );
      })}
      {console.log(report[1])}
    </Container>
  );
};

export default Total;

export const getStaticProps: GetStaticProps = async (context) => {
  const report = (await fetcher(
    'http://localhost:8080/api/v1/user/chart-report',
  )) as Array<ChartReport>;
  return {
    props: { report },
  };
};
