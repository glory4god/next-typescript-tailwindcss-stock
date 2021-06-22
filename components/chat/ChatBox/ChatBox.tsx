import React from 'react';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import ChatList from '../ChatList';
import ChatInput from '../ChatInput';
import type {
  GetChatData,
  PostChatDataForm,
} from '../../../types/chat/ChatType';

interface Props {
  className?: string;
}

const ChatBox: React.FC<Props> = ({ className }) => {
  const [postChatForm, setPostChatForm] = React.useState<PostChatDataForm>({
    userName: 'hayoung',
    content: '',
  });
  const [chatList, setChatList] = React.useState<Array<GetChatData>>([]);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const chatRef = React.useRef<HTMLDivElement>(null);

  const getChatData = async () => {
    const response = await fetch('http://localhost:8080/api/stock/data/chat');
    if (!response.ok) {
      return window.alert('get failed!');
    }
    const resJson = await response.json();
    setChatList(resJson);
  };

  const postChatData = React.useCallback(async (item: PostChatDataForm) => {
    const response = await fetch(
      'http://localhost:8080/api/stock/data/chat/post',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      },
    );
    if (!response.ok) {
      return window.alert('post failed!');
    }
    getChatData();
  }, []);

  React.useEffect(() => {
    getChatData();
  }, []);

  //스크롤 최하단으로 보내기 ref 함수
  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: 'auto' });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [chatList, isClick]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPostChatForm(() => ({
      ...postChatForm,
      content: e.target.value,
    }));
  };

  // isClick true일 때, Escape 키 누르면 false 될 수 있는 기능 필요
  return (
    <Paper className={cn(className)}>
      <h1
        className="cursor-pointer p-1 font-bold"
        onClick={() => setIsClick((c) => !c)}>
        실시간 채팅
      </h1>
      {isClick && (
        <div className="w-60">
          <div className="p-2 h-80 overflow-y-scroll border-2">
            {chatList.map((arr, idx) => {
              return <ChatList key={'chat' + arr.userName + idx} chat={arr} />;
            })}
            <div ref={chatRef} />
          </div>
          <ChatInput
            className="flex px-1"
            onChange={onChange}
            postChatForm={postChatForm}
            postChatData={postChatData}
            resetInput={() =>
              setPostChatForm(() => ({ ...postChatForm, content: '' }))
            }
          />
        </div>
      )}
    </Paper>
  );
};

export default React.memo(ChatBox);
