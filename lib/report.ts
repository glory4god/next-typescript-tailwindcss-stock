import fetcher from './fetcher';
import type { ChartReport } from '../types/report/ReportType';

export async function getReportIds() {
  const report = (await fetcher(
    process.env.LOCAL_SERVER +
      'api/v1/user/chart-report/sort-all?sorted=modifiedDate',
  )) as Array<ChartReport>;

  const paths: string[] = report.map((arr) => {
    return arr.id.toString();
  });
  return paths;
}

export async function getReportById(id: string) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/user/chart-report/${id}`,
  )) as ChartReport;
}

export async function goodAndBadHandler(
  value: string,
  id: number,
  reportId: number,
) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/user/chart-report/patch/${value}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id, reportId: reportId }),
    },
  )) as string;
}

export async function viewsHandler(id: number) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/user/chart-report/views/${id}`,
    {
      method: 'PATCH',
    },
  )) as string;
}
