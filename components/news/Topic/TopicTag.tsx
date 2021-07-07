import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
  title: string;
  clicked: boolean;
  onClick?: () => void;
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
        'md:px-4 px-2 flex py-2 rounded-full text-xs md:font-bold text-white cursor-pointer justify-center items-center',
        {
          'bg-indigo-400': clicked === true,
          'text-indigo-400 border-2 border-indigo-200': clicked === false,
        },
      )}
      onClick={onClick}>
      <span>{title}</span>
    </div>
  );
};

export default TopicTag;
