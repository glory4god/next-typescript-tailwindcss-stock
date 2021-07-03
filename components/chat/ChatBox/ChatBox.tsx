import React from 'react';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import ChatList from '../ChatList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import fetcher from '../../../lib/fetcher';

interface Props {
  className?: string;
}

type PostMessage = {
  username: string;
  content: string;
};

export type Message = {
  username: string;
  content: string;
  date: string;
};

let sockJs = new SockJS('http://54.180.68.136:8080/api/v2/web-socket');
let stompClient: Stomp.Client = Stomp.over(sockJs);
stompClient.debug = () => {};

const ChatBox: React.FC<Props> = ({ className }) => {
  const [contents, setContents] = React.useState<Message[]>([]);
  const [username, setUsername] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [login, setLogin] = React.useState<boolean>(false);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const chatRef = React.useRef<HTMLDivElement>(null);

  const initialData = async () => {
    const data: Array<Message> = (await fetcher(
      'http://54.180.68.136:8080/api/v2/web-socket/topic/roomId/all',
    )) as Array<Message>;
    setContents(data);
  };
  React.useEffect(() => {
    initialData();
    scrollToBottom();
  }, [login, isClick]);

  const handleEnter = (username: string, content: string) => {
    if (content.length === 0) {
      return window.alert(`There's not content!!`);
    }
    const newMessage: PostMessage = { username, content };
    stompClient.send('/send-message', {}, JSON.stringify(newMessage));
    setMessage('');
  };

  React.useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/roomId', (data) => {
        const newMessage: Message = JSON.parse(data.body) as Message;
        setContents((prev) => [...prev, newMessage]);
      });
    });
    scrollToBottom();
    console.log(contents);
  }, [contents]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEnter(username, message);
    }
  };

  //스크롤 최하단으로 보내기 ref 함수
  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: 'auto' });
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
            {contents.map((arr, idx) => {
              return (
                <ChatList
                  key={'chat' + arr.username + idx}
                  chat={arr}
                  isUser={arr.username === username}
                />
              );
            })}
            <div ref={chatRef} />
          </div>
          <div className="flex px-1">
            {login ? (
              <>
                <TextField
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={onKeyDown}
                />
                <Button
                  size="small"
                  onClick={() => handleEnter(username, message)}>
                  전송
                </Button>
              </>
            ) : (
              <>
                <TextField
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      setLogin(true);
                    }
                  }}
                  placeholder="아이디를 입력하세요"
                />
                <Button
                  size="small"
                  onClick={() => () => setLogin(true)}
                  disabled={username.length === 0}>
                  전송
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default React.memo(ChatBox);
