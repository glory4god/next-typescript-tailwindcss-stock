import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Subnavbar from '../../../components/common/Subnavbar';
import { BoardList } from '../../../components/board';
import { Container } from '../../../components/ui';
import {
  fetchFreeBoard,
  selectFreeBoard,
} from '../../../lib/redux/freeBoard/freeBoardSlice';
import Link from 'next/link';

const FreeBoardPage = () => {
  const { freeBoardList } = useSelector(selectFreeBoard);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchFreeBoard());
  }, []);

  return (
    <Container>
      <Subnavbar
        pages={{
          main: 'board',
          sub: { first: 'free', second: 'chart', third: 'my' },
        }}
      />
      <h2 className="my-4">FREE BOARD</h2>
      <div className="text-right">
        <Link href="/board/free/writing">
          <a href="#">
            <Button>글쓰기</Button>
          </a>
        </Link>
      </div>
      <BoardList freeBoardList={freeBoardList} listNumber={10} />
    </Container>
  );
};

export default FreeBoardPage;
