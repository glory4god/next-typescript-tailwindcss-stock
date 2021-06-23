import React, { FC } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

interface Props {
  pages: {
    main: string;
    sub: { first: string; second: string; third: string; forth?: string };
  };
}

const SubNavbar: FC<Props> = ({ pages }) => {
  return (
    <div className="text-xs space-x-6">
      <Link href={`/${pages.main}/${pages.sub.first}`}>
        <a>
          <Button>{pages.sub.first}</Button>
        </a>
      </Link>
      <Link href={`/${pages.main}/${pages.sub.second}`}>
        <a>
          <Button>{pages.sub.second}</Button>
        </a>
      </Link>
      <Link href={`/${pages.main}/${pages.sub.third}`}>
        <a>
          <Button>{pages.sub.third}</Button>
        </a>
      </Link>
      {pages.sub.forth && (
        <Link href={`/${pages.main}/${pages.sub.forth}`}>
          <a>
            <Button>{pages.sub.forth}</Button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default React.memo(SubNavbar);
