import React from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import fetcher from '../../../lib/fetcher';

interface Props {}

type PostMessage = {
  username: string;
  content: string;
};

type Message = {
  username: string;
  content: string;
  date: string;
};

let sockJs = new SockJS('http://localhost:8080/api/v2/web-socket');
let stompClient: Stomp.Client = Stomp.over(sockJs);
stompClient.debug = () => {};

const Chat: React.FC<Props> = () => {
  const [contents, setContents] = React.useState<Message[]>([]);
  const [username, setUsername] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [login, setLogin] = React.useState<boolean>(false);
  const chatRef = React.useRef<HTMLDivElement>(null);

  const initialData = async () => {
    const data: Array<Message> = (await fetcher(
      'http://localhost:8080/api/v2/web-socket/topic/roomId/all',
    )) as Array<Message>;
    setContents(data);
  };
  React.useEffect(() => {
    initialData();
    scrollToBottom();
  }, [login]);

  React.useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/roomId', (data) => {
        const newMessage: Message = JSON.parse(data.body) as Message;
        setContents((prev) => [...prev, newMessage]);
      });
    });
  }, [contents]);

  const handleEnter = (username: string, content: string) => {
    if (content.length === 0) {
      return window.alert(`There's not content!!`);
    }
    const newMessage: PostMessage = { username, content };
    stompClient.send('/send-message', {}, JSON.stringify(newMessage));
    setMessage('');
  };

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: 'auto' });
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [contents]);

  // const formattingTimestamp = (timestamp: string) => {
  //   const date = new Date(timestamp);
  //   let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  //   let min =
  //     date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  //   return `${hour}:${min}`;
  // };

  return (
    <div>
      {!login ? (
        <>
          <div>
            유저이름 :
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={() => setLogin(true)}>입장</button>
          </div>
        </>
      ) : (
        <>
          <div>
            CONTENT :
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') {
                  handleEnter(username, message);
                }
              }}
            />
            <button onClick={() => handleEnter(username, message)}>
              보내기
            </button>
          </div>
          <div className="h-40 overflow-y-scroll">
            {contents.map((arr, idx) => {
              return (
                <div key={idx}>
                  {arr.username} : {arr.content} ({arr.date})
                </div>
              );
            })}
            <div ref={chatRef} />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
