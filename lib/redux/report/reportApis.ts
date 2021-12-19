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
  dbName: string,
  column: string,
  value: string,
  sorted: string,
) {
  return (await fetcher(
    process.env.LOCAL_SERVER +
      `api/v1/board/search?dbname=${dbName}&column=${
        column === 'title+content' ? 'content' : column
      }&value=${value}&sorted=${sorted}`,
  )) as Array<ChartReport>;
}

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
  dbName: string,
  value: string,
  id: number,
  reportId: number,
) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/user/board/patch/${dbName}/${value}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id, reportId: reportId }),
    },
  )) as string;
}

export async function viewsHandler(dbName: string, id: number) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/board/views/${dbName}/${id}`,
    {
      method: 'PATCH',
    },
  )) as string;
}

export async function checkIdByNickname(nickname: string) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v2/user/${nickname}`,
  )) as number;
}
