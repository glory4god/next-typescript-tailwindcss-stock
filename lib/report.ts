import fetcher from './fetcher';
import type { ChartReport } from '../types/report/ReportType';

export async function getReportIds() {
  const report = (await fetcher(
    process.env.AWS_SERVER + 'api/v1/user/chart-report',
  )) as Array<ChartReport>;

  const paths: string[] = report.map((arr) => {
    return arr.id.toString();
  });
  return paths;
}

export async function getReportById(id: string) {
  return (await fetcher(
    process.env.AWS_SERVER + `api/v1/user/chart-report/${id}`,
  )) as ChartReport;
}

export async function goodHandler(id: number, value: string) {
  return (await fetcher(
    process.env.AWS_SERVER +
      `api/v1/user/chart-report/good/${id}?value=${value}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    },
  )) as string;
}

export async function badHandler(id: number, value: string) {
  return (await fetcher(
    process.env.AWS_SERVER +
      `api/v1/user/chart-report/bad/${id}?value=${value}`,
    {
      method: 'PATCH',
    },
  )) as string;
}

export async function viewsHandler(id: number) {
  return (await fetcher(
    process.env.AWS_SERVER + `api/v1/user/chart-report/views/${id}`,
    {
      method: 'PATCH',
    },
  )) as string;
}
