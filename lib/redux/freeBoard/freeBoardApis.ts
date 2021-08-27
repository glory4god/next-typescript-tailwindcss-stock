import { FreeBoard } from '../../../types/report/ReportType';
import fetcher from '../../fetcher';

export async function getFreeBoardAll(sorted: string) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/freeboard?sorted=${sorted}`,
  )) as Array<FreeBoard>;
}

export async function getFreeBoardIds() {
  const freeBoard = (await fetcher(
    process.env.LOCAL_SERVER + 'api/v1/freeboard?sorted=modifiedDate',
  )) as Array<FreeBoard>;

  const paths: string[] = freeBoard.map((arr) => {
    return arr.id.toString();
  });
  return paths;
}

export async function getFreeBoardById(id: string) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/freeboard/${id}`,
  )) as FreeBoard;
}
