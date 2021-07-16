import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        'h-44 md:pt-8 pt-4 mt-8 text-black my-auto px-6 bg-gray-100',
      )}>
      <div className="max-w-screen-lg mx-auto">
        <div className="pb-4">
          <b>Project name</b> <span>2021.5 ~ now</span>
        </div>
        <div>
          <b>front-end</b> : Nextjs / Reactjs / Typescript / React-Redux /
          Redux-toolkit/ Tailwindcss / CSS Modules / Library [ recharts /
          material UI / Responsive Web ]
        </div>
        <div>
          <b>back-end</b> : Java Springboot / MariaDB / AWS EC2 / AWS RDS /
          Naver News API
        </div>
      </div>
    </div>
  );
};

export default Footer;
