import React from 'react';
import cn from 'classnames';
import styles from './WritingBoard.module.css';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { selectKakaoLogin } from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';
import { BulletinBoard } from '../../../types/report/ReportType';

interface Props {
  className?: string;
  board?: BulletinBoard;
  closeEditing?: () => void;
}

interface PostBoard {
  userId: number;
  title: string;
  content: string;
}

const WritingBoard: React.FC<Props> = ({ className, board, closeEditing }) => {
  const router = useRouter();

  const { login, id } = useSelector(selectKakaoLogin);
  const [writing, setWriting] = React.useState<PostBoard>({
    userId: id,
    title: '',
    content: '',
  });

  const saveBoard = async (writing: PostBoard) => {
    if (board === undefined) {
      const res = await fetch(
        process.env.LOCAL_SERVER + 'api/v1/bulletinboard/post',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(writing),
        },
      );

      if (res.ok) {
        router.push('http://localhost:3000/board/bulletin');
      } else {
        alert('글을 작성하지 못했습니다.');
      }
    } else {
      const res = await fetch(
        process.env.LOCAL_SERVER + `api/v1/bulletinboard/update/${board.id}`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(writing),
        },
      );
      if (res.ok) {
        if (closeEditing !== undefined) {
          closeEditing();
          router.replace(`http://localhost:3000/board/bulletin/${board.id}`);
        }
      } else {
        alert('글을 수정하지 못했습니다.');
      }
    }
  };

  React.useEffect(() => {
    if (board === undefined) {
      setWriting({
        userId: id,
        title: '',
        content: '',
      });
    } else {
      setWriting({
        userId: id,
        title: board.title,
        content: board.content,
      });
    }
  }, []);

  return (
    <div className={cn(className, styles.writing)}>
      <div className={styles.title}>
        <input
          className={styles.input}
          placeholder={board === undefined ? 'TITLE' : board.title}
          onChange={(e: any) =>
            setWriting(() => ({
              ...writing,
              title: e.target.value,
            }))
          }
          value={writing.title}
        />
        {console.log(writing)}
      </div>
      <div className={styles.content}>
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={5}
          className={styles.textarea}
          placeholder={board === undefined ? 'CONTENT' : board.content}
          onChange={(e) =>
            setWriting(() => ({
              ...writing,
              content: e.target.value,
            }))
          }
          value={writing.content}
        />
      </div>
      <div className="text-right">
        <Button
          onClick={() => {
            saveBoard(writing);
          }}>
          {board === undefined ? '글쓰기' : '수정하기'}
        </Button>
        {closeEditing !== undefined && (
          <Button onClick={() => closeEditing()}>닫기</Button>
        )}
      </div>
    </div>
  );
};

export default WritingBoard;
