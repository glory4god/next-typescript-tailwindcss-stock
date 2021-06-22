import React from 'react';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import type { PostChatDataForm } from '../../../types/chat/ChatType';

interface Props {
  className?: string;
  postChatForm: PostChatDataForm;
  postChatData: (data: PostChatDataForm) => void;
  resetInput: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ChatInput: React.FC<Props> = ({
  className,
  postChatForm,
  resetInput,
  postChatData,
  onChange,
}) => {
  return (
    <div className={cn(className)}>
      <TextField
        onChange={onChange}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter') {
            postChatData(postChatForm);
            resetInput();
          }
        }}
        value={postChatForm.content}
      />
      <Button
        size="small"
        onClick={() => {
          if (postChatForm.content !== '') {
            postChatData(postChatForm);
            resetInput();
          }
        }}
        disabled={postChatForm.content === ''}>
        전송
      </Button>
    </div>
  );
};

export default React.memo(ChatInput);
