import fetcher from './fetcher';
import type { ChartReport } from '../types/report/ReportType';

export async function getReportIds() {
  const report = (await fetcher(
    'http://localhost:8080/api/v1/user/chart-report',
  )) as Array<ChartReport>;

  const paths: string[] = report.map((arr) => {
    return arr.id.toString();
  });
  return paths;
}

export async function getReportById(id: string) {
  const data = (await fetcher(
    `http://localhost:8080/api/v1/user/chart-report/${id}`,
  )) as ChartReport;
  return data;
}
