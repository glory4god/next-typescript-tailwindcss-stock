import React from 'react';
import Image from 'next/image';
import LinkIcon from '@material-ui/icons/Link';
import copy from 'copy-to-clipboard'; // url 클립보드 복사 기능
import styles from './Topic.module.css';

interface Props {
  topic: string;
  link: string;
  title: string;
  imageUrl: string;
  skeleton: boolean;
}

const TopicView: React.FC<Props> = ({
  topic,
  link,
  title,
  imageUrl,
  skeleton,
}) => {
  return (
    <div
      style={{ width: '328px', height: '400px' }}
      className="border-2 rounded-xl my-2">
      <div className="text-xl flex justify-between text-left px-8 font-bold py-8 ">
        <span className="bg-indigo-200 rounded-full text-xs text-white px-4 py-1">
          # {topic}
        </span>
        <LinkIcon
          onClick={() => {
            // url 클립보드 복사 기능
            if (skeleton === false) {
              copy(link);
              alert('copied url link!');
            }
            // if (skeleton === false) {
            //   var win = window.open(link);
            //   if (win !== null) {
            //     win.focus();
            //   }
            // }
          }}
          className="cursor-pointer transform rotate-45"
        />
      </div>
      <div
        className="h-24 text-left text-lg px-4"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div
        className="cursor-pointer"
        onClick={() => {
          if (skeleton === false) {
            var win = window.open(link);
            if (win !== null) {
              win.focus();
            }
          }
        }}>
        {imageUrl !== 'nothing' ? (
          // <div
          //   className={styles.image}
          //   style={{
          //     backgroundImage: `url(${imageUrl})`,
          //   }}
          // />
          <Image
            className={styles.image}
            src={`${imageUrl}` || '/favicon.ico'}
            alt={title}
            width={328}
            height={215}
            objectFit="cover"
            objectPosition="50% 10%"
          />
        ) : (
          <Image src={'/favicon.ico'} alt={title} width={328} height={210} />
        )}
      </div>
    </div>
  );
};

export default React.memo(TopicView);
