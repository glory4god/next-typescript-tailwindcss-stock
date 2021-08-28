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
import { ButtonData } from '../chart';

const sortedButton: ButtonData = {
  LATEST: 'modifiedDate',
  HOT: 'good',
  VIEWS: 'views',
};

const BulletinBoardPage = () => {
  const { bulletinBoardList, loading } = useSelector(selectBulletinBoard);
  const [sortedColumn, setSortedColumn] =
    React.useState<string>('modifiedDate');
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchBulletinBoard(sortedColumn));
  }, [sortedColumn]);

  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'board',
          sub: { first: 'bulletin', second: 'chart', third: 'my' },
        }}
      />
      <h2 className="my-4">BULLETIN BOARD</h2>
      <div className="flex justify-between">
        <div className="text-left">
          <Link href="/board/bulletin/writing">
            <a href="#">
              <Button>글쓰기</Button>
            </a>
          </Link>
        </div>
        <div>
          {Object.keys(sortedButton).map((arr, idx) => {
            return (
              <Button
                size="small"
                style={{
                  border: `${
                    sortedColumn === sortedButton[arr]
                      ? '1px solid #818cf8'
                      : 'none'
                  }`,
                }}
                key={arr}
                onClick={(e) => {
                  e.preventDefault();
                  setSortedColumn(sortedButton[arr]);
                }}
                disabled={loading}>
                {loading ? arr + '...' : arr}
              </Button>
            );
          })}
        </div>
      </div>
      <BoardList bulletinBoardList={bulletinBoardList} listNumber={10} />
    </Container>
  );
};

export default BulletinBoardPage;
