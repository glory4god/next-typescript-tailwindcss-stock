import fetcher from '../../fetcher';
import { ChartReport } from '../../../types/report/ReportType';

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

export async function getUserReportAll(userId: number) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/user/chart-report/username?id=${userId}`,
  )) as Array<ChartReport>;
}

export async function getSearchReportAll(
  condition: string,
  value: string,
  sorted: string,
) {
  return (await fetcher(
    process.env.LOCAL_SERVER +
      `api/v1/user/chart-report/search?condition=${condition}&value=${value}&sorted=${sorted}`,
  )) as Array<ChartReport>;
}
