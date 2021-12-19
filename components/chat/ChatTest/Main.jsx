import React from 'react';
import SockJsClient from 'react-stomp';
import chatAPI from './ChatApi';
import { Chat, Input } from './index';

const Main = () => {
  const [messages, setMessages] = React.useState([]);
  const [user, setUser] = React.useState(null);

  const onMessageReceived = (msg) => {
    console.log('New Message Received!', msg);
    setMessages([...messages, msg]);
  };
  const handleLoginSubmit = (name) => {
    setUser({ name: name, color: 'red' });
  };
  const handleMessageSubmit = (msg) => {
    chatAPI
      .sendMessages(user.name, msg)
      .then((res) => {
        console.log('sent', res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div>
        <SockJsClient
          url={'http://localhost:8080/api/v2/kafka-chat/'}
          topics={['/topic/groㅌup']}
          onConnect={console.log('connected')}
          onDisconnect={console.log('disconnected!')}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
        />
        <Chat messages={messages} currentUser={user} />
        <Input />
        ㅎㅇㅎㅇ
      </div>
    </>
  );
};

export default Main;
