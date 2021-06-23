import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  title: string;
  clicked: boolean;
  onClick: () => void;
}

const TopicTag: React.FC<Props> = ({
  className,
  title,
  clicked = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        className,
        'md:px-6 px-2 flex h-10 rounded-3xl md:text-sm text-xs w-full font-bold text-white cursor-pointer justify-center items-center',
        {
          'bg-indigo-400 ': clicked === true,
          'bg-indigo-200': clicked === false,
        },
      )}
      onClick={onClick}>
      <span>{title}</span>
    </div>
  );
};

export default TopicTag;
