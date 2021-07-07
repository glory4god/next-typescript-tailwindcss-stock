import { FC } from 'react';

interface Props {
  className?: string;
}

const Footer: FC<Props> = ({ className }) => {
  return (
    <div className="h-40 md:pt-8 pt-4 mt-8 text-black my-auto px-6 bg-gray-100">
      <div className="max-w-screen-lg mx-auto">
        <div>
          <b>Yu</b>
        </div>
        <div>2021.5 ~ now</div>
        <div>
          <b>front-end</b> : Nextjs / Reactjs / Typescript / Tailwindcss /
          Library(recharts / material UI / Responsive Web)
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
