import React from 'react';
import cn from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
  className?: string;
  dataCondition: any;
  refresh: () => void;
}

type PostBoardCondition = {
  companyName: string | undefined;
  value: string | undefined;
  graphEffect: string | undefined;
  startDate: string;
  endDate: string;
  title: string;
  content: string;
};

type Save = {
  loading: boolean;
  editing: boolean;
};
type WritingText = {
  title: string;
  content: string;
};

const InitialSave: Save = {
  loading: false,
  editing: false,
};
const InitialWritingText: WritingText = {
  title: '',
  content: '',
};

const SaveReport: React.FC<Props> = ({ className, dataCondition, refresh }) => {
  const [isSave, setIsSave] = React.useState<Save>(InitialSave);
  const [writing, setWriting] = React.useState<WritingText>(InitialWritingText);
  const [postBoardItem, setPostBoardItem] = React.useState<PostBoardCondition>({
    ...dataCondition,
    title: '',
    content: '',
  });

  const postReport = async (item: PostBoardCondition) => {
    setIsSave(() => ({
      ...isSave,
      loading: true,
    }));
    const response = await fetch(
      'http://localhost:8080/api/user/chart-record/post',
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
      setWriting(InitialWritingText);
    }
  };

  const postClickHandler = (writing: WritingText) => {
    if (writing.title === '') {
      return window.alert('제목을 입력하세요');
    } else if (writing.content === '') {
      return window.alert('내용을 입력하세요');
    } else {
      setPostBoardItem(() => ({
        ...postBoardItem,
        title: writing.title,
        content: writing.content,
      }));
      postReport(postBoardItem);
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
          setWriting(InitialWritingText);
        }}>
        RESET
      </Button>
      {isSave.editing && (
        <div>
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              setWriting(() => ({
                ...writing,
                title: e.target.value,
              }));
            }}
            value={writing.title}
            label="TITLE"
          />
          <br />
          <TextField
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              setWriting(() => ({
                ...writing,
                content: e.target.value,
              }));
            }}
            value={writing.content}
            label="CONTENT"
          />
          <br />
          <Button onClick={() => postClickHandler(writing)}>
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
