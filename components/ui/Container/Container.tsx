import React, { FC } from 'react';
import cn from 'classnames';

interface ContainerProps {
  className?: string;
  children?: any;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={
        (cn(className),
        'min-h-screen max-w-screen-lg text-center pt-20 text-black mx-auto px-6')
      }>
      {children}
    </div>
  );
};

export default React.memo(Container);
