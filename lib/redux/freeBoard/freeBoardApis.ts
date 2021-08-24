import { FreeBoard } from '../../../types/report/ReportType';
import fetcher from '../../fetcher';

export async function getFreeBoardAll(sorted: string) {
  return (await fetcher(
    process.env.LOCAL_SERVER + `api/v1/freeboard?sorted=${sorted}`,
  )) as Array<FreeBoard>;
}
