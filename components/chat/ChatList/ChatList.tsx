import React from 'react';
import cn from 'classnames';
import type { Message } from '../ChatBox/ChatBox';
interface Props {
  chat: Message;
  isUser: boolean;
}
const ChatList: React.FC<Props> = ({ chat, isUser }) => {
  return (
    <div className={cn('py-1', { 'text-right': isUser })}>
      <div
        className={cn({ ' text-indigo-400': isUser })}
        style={{ fontSize: '8px' }}>
        {!isUser ? chat.username : 'ME'} - {chat.date.slice(11, 19)}
      </div>
      <div style={{ fontSize: '14px' }}>{chat.content}</div>
    </div>
  );
};

export default React.memo(ChatList);
