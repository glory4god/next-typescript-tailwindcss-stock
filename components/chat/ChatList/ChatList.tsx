import React from 'react';
import type { GetChatData } from '../../../types/chat/ChatType';

interface Props {
  chat: GetChatData;
}
const ChatContent: React.FC<Props> = ({ chat }) => {
  return (
    <div className="py-1">
      <div style={{ fontSize: '8px' }}>
        {chat.userName} :{chat.createDate.toString().substr(11, 18)}
      </div>
      <div style={{ fontSize: '14px' }}>{chat.content}</div>
    </div>
  );
};

export default React.memo(ChatContent);
