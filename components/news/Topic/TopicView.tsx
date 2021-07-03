import React from 'react';
import Image from 'next/image';
import LinkIcon from '@material-ui/icons/Link';

interface Props {
  topic: string;
  link: string;
  title: string;
  description: string;
  skeleton: boolean;
}

const TopicView: React.FC<Props> = ({
  topic,
  link,
  title,
  description,
  skeleton,
}) => {
  return (
    <div
      style={{ width: '328px', height: '400px' }}
      className="border-2 rounded-xl px-4 my-2">
      <div className="text-xl flex justify-between text-left px-4 font-bold py-8">
        <span className="bg-indigo-200 rounded-3xl text-xs text-white px-4 py-1">
          # {topic}
        </span>
        <LinkIcon
          onClick={() => {
            if (skeleton === false) {
              var win = window.open(link);
              if (win !== null) {
                win.focus();
              }
            }
          }}
          className="cursor-pointer"
        />
      </div>
      <h4
        className="h-28 text-left text-lg"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p dangerouslySetInnerHTML={{ __html: description }} />
      {/* <Image src={link} alt={title} /> */}
    </div>
  );
};

export default TopicView;
