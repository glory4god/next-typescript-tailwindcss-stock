import React from 'react';
import Image from 'next/image';
import LinkIcon from '@material-ui/icons/Link';

interface Props {
  topic: string;
  link: string;
  title: string;
  description: string;
}

const TopicView: React.FC<Props> = ({ topic, link, title, description }) => {
  return (
    <div
      style={{ width: '328px', height: '400px' }}
      className="border-2 rounded-xl px-4 my-2">
      <h3 className="text-xl text-left pl-4 font-bold py-6">#{topic}</h3>
      <div className="flex justify-between h-28">
        <h4
          className=" w-72 text-left"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <LinkIcon
          onClick={() => {
            var win = window.open(link);
            if (win !== null) {
              win.focus();
            }
          }}
          className="cursor-pointer bottom mt-5"
        />
      </div>
      <p dangerouslySetInnerHTML={{ __html: description }} />
      {/* <Image src={link} alt={title} /> */}
    </div>
  );
};

export default TopicView;
