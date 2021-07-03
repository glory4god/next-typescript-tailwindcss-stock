import React from 'react';
import type { Message } from '../ChatBox/ChatBox';
interface Props {
  chat: Message;
}
const ChatList: React.FC<Props> = ({ chat }) => {
  return (
    <div className="py-1">
      <div style={{ fontSize: '8px' }}>
        {chat.username} :{chat.date.toString().substr(11, 18)}
      </div>
      <div style={{ fontSize: '14px' }}>{chat.content}</div>
    </div>
  );
};

export default React.memo(ChatList);
