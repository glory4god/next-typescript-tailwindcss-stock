import React from 'react';
import cn from 'classnames';
import { BulletinBoard } from '../../../types/report/ReportType';
import styles from './BulletinBoardView.module.css';
import ThumbUp from '@material-ui/icons/ThumbUp';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import copy from 'copy-to-clipboard'; // url 클립보드 복사 기능
import { useRouter } from 'next/dist/client/router';
import { goodAndBadHandler } from '../../../lib/redux/report/reportApis';
import BoardList from '../BoardList';
import { useSelector } from 'react-redux';
import { selectKakaoLogin } from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';
import fetcher from '../../../lib/fetcher';
import WritingBoard from '../WritingBoard';

interface Props {
  className?: string;
  board: BulletinBoard;
  bulletinBoardList: Array<BulletinBoard>;
}

const BulletinBoardView: React.FC<Props> = ({
  className,
  board,
  bulletinBoardList,
}) => {
  const pages = useRouter();

  const { login, id, nickname } = useSelector(selectKakaoLogin);
  const [isWriter, setIsWriter] = React.useState<boolean>(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const [goodCounter, setGoodCounter] = React.useState<number>(board.good);
  const [pressed, setPressed] = React.useState<boolean>(false);

  const pressCheck = async (userId: number, boardId: number) => {
    const press = (await fetcher(
      process.env.LOCAL_SERVER +
        `api/v1/bulletinboard/pressed?user=${userId}&board=${boardId}`,
    )) as boolean;
    setPressed(press);
  };

  const deleteBoard = async (boardId: number, userId: number) => {
    const result = confirm('게시글을 삭제하시겠습니까?');
    if (result) {
      const res = await fetch(
        process.env.LOCAL_SERVER +
          `api/v1/bulletinboard/post/${boardId}/${userId}`,
        {
          method: 'DELETE',
        },
      );
      if (res.ok) {
        pages.push('/board/bulletin');
      } else {
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const userIdChecker = async (id: number, nickname: string) => {
    const checkId = (await fetcher(
      process.env.LOCAL_SERVER + `api/v2/user/${nickname}`,
    )) as number;
    if (id === checkId) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
  };

  const deleteHandler = () => {
    if (login) {
      if (board.username === nickname) {
        deleteBoard(board.id, id);
      } else {
        alert('게시글을 삭제할 수 없습니다.');
      }
    } else {
      alert('로그인 후 이용 가능합니다!');
    }
  };

  const editBoard = () => {};

  const editHandler = () => {
    if (login) {
      if (board.username === nickname) {
        setIsEditing(true);
      }
    }
  };

  // TODO : 추후에 login 도입 후엔 이미 클릭했다면 취소하는 기능 추가 구현해야함!
  // 완료
  const goodHandler = async () => {
    if (login) {
      if (pressed === false) {
        setGoodCounter((good) => good + 1);
      } else {
        setGoodCounter((good) => good - 1);
      }
      await goodAndBadHandler('bulletin', 'good', id, board.id);
      pressCheck(id, board.id);
    } else {
      alert('로그인 후 이용 가능합니다!');
    }
  };

  // TODO : 추후에 login 도입 후엔
  React.useEffect(() => {
    if (login === true) {
      pressCheck(id, board.id);
      userIdChecker(id, board.username);
    } else {
      setIsWriter(false);
    }
  }, [goodCounter, login, id, board]);

  return (
    <div className={cn(className)}>
      {!isEditing ? (
        <>
          <div className={styles.title}>
            <h3 className="text-4xl">{board.title}</h3>
            <div
              className="pt-4 space-x-4 cursor-pointer"
              onClick={() => {
                alert('copied url link!');
                copy('http://localhost:3000' + pages.asPath);
              }}>
              URL copy <LinkIcon className="transform rotate-45" />
            </div>
          </div>
          <div className={styles.reportInfo}>
            <h4>{board.username}</h4>
            <div>
              Views {board.views} /{' '}
              {board.modifiedDate.toString().substr(0, 10)}{' '}
              {board.modifiedDate.toString().substr(11)}
            </div>
          </div>
          <div className={styles.content}>
            <div>
              <p className="h-48">{board.content}</p>
            </div>
            <div className="flex justify-between">
              <div className="space-x-4">
                <ThumbUp
                  fontSize="small"
                  className="cursor-pointer"
                  style={{
                    color: `${
                      login === true && pressed === true ? '#818cf8' : '#a7a8a8'
                    }`,
                  }}
                  onClick={() => goodHandler()}
                />{' '}
                {goodCounter}
              </div>
              {isWriter && (
                <div>
                  <Button onClick={() => editHandler()}>수정</Button>
                  <Button onClick={() => deleteHandler()}>삭제</Button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <WritingBoard board={board} closeEditing={() => setIsEditing(false)} />
      )}
      <div className={styles.comment}>
        <h4>댓글</h4>
      </div>
      <BoardList
        bulletinBoardList={bulletinBoardList?.filter((c) => c.id !== board.id)}
        listNumber={5}
      />
    </div>
  );
};

export default BulletinBoardView;
