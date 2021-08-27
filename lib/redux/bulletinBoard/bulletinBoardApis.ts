import { BulletinBoard } from '../../../types/report/ReportType';
import fetcher from '../../fetcher';

export async function getBulletinBoardAll(sorted: string) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/freeboard?sorted=${sorted}`,
  )) as Array<BulletinBoard>;
}

export async function getBulletinBoardIds() {
  const freeBoard = (await fetcher(
    process.env.LOCAL_SERVER + 'api/v1/freeboard?sorted=modifiedDate',
  )) as Array<BulletinBoard>;

  const paths: string[] = freeBoard.map((arr) => {
    return arr.id.toString();
  });
  return paths;
}

export async function getBulletinBoardById(id: string) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/freeboard/${id}`,
  )) as BulletinBoard;
}
