import React from 'react';
import cn from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import type { PostChartReport } from '../../../types/report/ReportType';
import { useRouter } from 'next/dist/client/router';
import { saveLocalPath } from '../../../lib/local/LocalData';
import { useSelector } from 'react-redux';
import { selectKakaoLogin } from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';

interface Props {
  className?: string;
  dataCondition: any;
  refresh: () => void;
}

const SaveReport: React.FC<Props> = ({ className, dataCondition, refresh }) => {
  const { login, nickname } = useSelector(selectKakaoLogin);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [editing, setEditing] = React.useState<boolean>(false);
  const [postBoardItem, setPostBoardItem] = React.useState<PostChartReport>({
    ...dataCondition,
    username: '',
    title: '',
    content: '',
  });
  const page = useRouter();
  React.useEffect(() => {
    if (login) {
      setPostBoardItem(() => ({
        ...postBoardItem,
        username: nickname,
      }));
    }
  }, [login, nickname]);

  const postReport = async (item: PostChartReport) => {
    console.log(item);
    setLoading(true);
    const response = await fetch(
      process.env.LOCAL_SERVER + 'api/v1/user/chart-report/post',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      },
    );

    if (!response.ok) {
      setLoading(false);
      return window.alert('post failed!');
    } else {
      window.alert('save complete!');
      setLoading(false);
      setPostBoardItem(() => ({
        ...postBoardItem,
        title: '',
        content: '',
      }));
    }
  };

  const postClickHandler = (item: PostChartReport) => {
    if (item.title === '' || item.title === null) {
      return window.alert('제목을 입력하세요');
    } else if (item.content === '' || item.content === null) {
      return window.alert('내용을 입력하세요');
    } else {
      postReport(item);
    }
  };

  return (
    <div className={cn(className)}>
      <Button
        onClick={() => {
          if (login) {
            setEditing(true);
            saveLocalPath(page.asPath);
          } else {
            alert('로그인 후 이용 가능합니다.');
          }
        }}>
        종목 글쓰기
      </Button>
      <Button
        onClick={() => {
          refresh();
          setEditing(false);
          setLoading(false);
        }}>
        RESET
      </Button>
      {editing && (
        <div>
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              setPostBoardItem(() => ({
                ...postBoardItem,
                title: e.target.value,
              }));
            }}
            value={postBoardItem.title}
            label="TITLE"
          />
          <br />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              setPostBoardItem(() => ({
                ...postBoardItem,
                content: e.target.value,
              }));
            }}
            value={postBoardItem.content}
            label="CONTENT"
          />
          <br />
          <Button onClick={() => postClickHandler(postBoardItem)}>
            {loading ? 'WRITING...' : 'WRITING'}
          </Button>
          <Button
            onClick={() => {
              setEditing(false);
            }}>
            CLOSE
          </Button>
        </div>
      )}
    </div>
  );
};

export default SaveReport;
