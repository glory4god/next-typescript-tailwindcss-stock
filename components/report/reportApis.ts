import fetcher from '../../lib/fetcher';
import { ChartReport } from '../../types/report/ReportType';

export async function getReportByCompanyName(
  companyName: string,
  sorted: string,
) {
  return (await fetcher(
    process.env.LOCAL_SERVER +
      `api/v1/user/chart-report/sorted/${companyName}?sorted=${sorted}`,
  )) as Array<ChartReport>;
}

export async function getReportAll(sorted: string) {
  return (await fetcher(
    process.env.LOCAL_SERVER +
      `api/v1/user/chart-report/sort-all?sorted=${sorted}`,
  )) as Array<ChartReport>;
}
