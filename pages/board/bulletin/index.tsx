import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Subnavbar from '../../../components/common/Subnavbar';
import { BoardList } from '../../../components/board';
import { Container } from '../../../components/ui';
import {
  fetchBulletinBoard,
  selectBulletinBoard,
} from '../../../lib/redux/bulletinBoard/bulletinBoardSlice';
import Link from 'next/link';

const BulletinBoardPage = () => {
  const { bulletinBoardList } = useSelector(selectBulletinBoard);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchBulletinBoard());
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
      <div className="text-right">
        <Link href="/board/bulletin/writing">
          <a href="#">
            <Button>글쓰기</Button>
          </a>
        </Link>
      </div>
      <BoardList bulletinBoardList={bulletinBoardList} listNumber={10} />
    </Container>
  );
};

export default BulletinBoardPage;
