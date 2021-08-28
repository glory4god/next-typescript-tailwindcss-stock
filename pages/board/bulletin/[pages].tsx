import React from 'react';
import Container from '../../../components/ui/Container';
import Subnavbar from '../../../components/common/Subnavbar';
import { GetStaticPaths, GetStaticProps } from 'next';
import type { BulletinBoard } from '../../../types/report/ReportType';

import { ParsedUrlQuery } from 'querystring';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBulletinBoard,
  selectBulletinBoard,
} from '../../../lib/redux/bulletinBoard/bulletinBoardSlice';
import {
  getBulletinBoardById,
  getBulletinBoardIds,
} from '../../../lib/redux/bulletinBoard/bulletinBoardApis';
import BulletinBoardView from '../../../components/board/BulletinBoardView';

const BulletinBoardPage = ({
  bulletinBoard,
}: {
  bulletinBoard: BulletinBoard;
}) => {
  const { bulletinBoardList } = useSelector(selectBulletinBoard);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (bulletinBoardList.length === 0) {
      dispatch(fetchBulletinBoard('modifiedDate'));
    }
  }, []);
  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'board',
          sub: { first: 'bulletin', second: 'chart', third: 'my' },
        }}
      />
      <h2 className="my-4">BULLETIN BOARD</h2>
      <BulletinBoardView
        className="text-left"
        board={bulletinBoard}
        bulletinBoardList={bulletinBoardList}
      />
    </Container>
  );
};

export default BulletinBoardPage;

//이 과정이 사실 정확히 뭔지는 모르겠지만 빨간줄이 안뜸 ㅠㅠ
interface IParams extends ParsedUrlQuery {
  pages: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const arr = (await getBulletinBoardIds()) as string[];
  const paths = arr.map((pages) => {
    return {
      params: { pages },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { pages } = context.params as IParams;
  const bulletinBoard = (await getBulletinBoardById(pages)) as BulletinBoard;

  return {
    props: { bulletinBoard },
  };
};
