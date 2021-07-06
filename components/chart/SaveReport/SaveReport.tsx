import React from 'react';
import cn from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import type { PostChartReport } from '../../../types/report/ReportType';

interface Props {
  className?: string;
  dataCondition: any;
  refresh: () => void;
}

type Save = {
  loading: boolean;
  editing: boolean;
};

const InitialSave: Save = {
  loading: false,
  editing: false,
};

const SaveReport: React.FC<Props> = ({ className, dataCondition, refresh }) => {
  const [isSave, setIsSave] = React.useState<Save>(InitialSave);
  const [postBoardItem, setPostBoardItem] = React.useState<PostChartReport>({
    ...dataCondition,
    username: 'hayoung',
    title: '',
    content: '',
  });

  const postReport = async (item: PostChartReport) => {
    console.log(item);
    setIsSave(() => ({
      ...isSave,
      loading: true,
    }));
    const response = await fetch(
      'http://54.180.68.136:8080/api/v1/user/chart-report/post',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      },
    );

    if (!response.ok) {
      setIsSave(() => ({
        loading: false,
        editing: true,
      }));
      return window.alert('post failed!');
    } else {
      window.alert('save complete!');
      setIsSave(() => ({
        loading: false,
        editing: false,
      }));
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
        onClick={() =>
          setIsSave(() => ({
            ...isSave,
            editing: true,
          }))
        }>
        종목 글쓰기
      </Button>
      <Button
        onClick={() => {
          refresh();
          setIsSave(InitialSave);
        }}>
        RESET
      </Button>
      {isSave.editing && (
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
            {isSave.loading ? 'WRITING...' : 'WRITING'}
          </Button>
          <Button
            onClick={() => {
              setIsSave(() => ({ ...isSave, editing: false }));
            }}>
            CLOSE
          </Button>
        </div>
      )}
    </div>
  );
};

export default SaveReport;
