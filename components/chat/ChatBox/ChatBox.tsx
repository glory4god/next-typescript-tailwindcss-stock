import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import ChatList from '../ChatList';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import fetcher from '../../../lib/fetcher';
import { useSelector } from 'react-redux';
import { selectKakaoLogin } from '../../../lib/redux/kakaoLogin/kakaoLoginSlice';

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

var sockJs = new SockJS(process.env.LOCAL_SERVER + 'api/v2/web-socket');
var stompClient: Stomp.Client = Stomp.over(sockJs);
stompClient.debug = () => {};

const ChatBox: React.FC<Props> = ({ className }) => {
  const { login, id } = useSelector(selectKakaoLogin);
  const [contents, setContents] = React.useState<Message[]>([]);
  const [message, setMessage] = React.useState<string>('');
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const chatRef = React.useRef<HTMLDivElement>(null);

  const initialData = async () => {
    const data: Array<Message> = (await fetcher(
      process.env.LOCAL_SERVER + 'api/v2/web-socket/topic/roomId/all',
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
  }, [contents]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEnter(id.toString(), message);
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
        onClick={() => {
          setIsClick((c) => !c);
        }}>
        실시간 채팅
      </h1>
      {isClick && (
        <div className="lg:w-72 w-64">
          <div className="p-2 lg:h-96 h-80 overflow-y-scroll border-2">
            {contents.map((arr, idx) => {
              return (
                <ChatList
                  key={'chat' + arr.username + idx}
                  chat={arr}
                  isUser={arr.username === id.toString()}
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
                  onClick={() => handleEnter(id.toString(), message)}>
                  전송
                </Button>
              </>
            ) : (
              <>
                <Button size="small" onClick={() => {}}>
                  <Link
                    href={
                      'https://kauth.kakao.com/oauth/authorize?client_id=536a201af32aa0d66156738f15380b36&redirect_uri=http://localhost:3000/login&response_type=code'
                    }>
                    <a> log in first! (click)</a>
                  </Link>
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
