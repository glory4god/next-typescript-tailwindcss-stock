import React, { FC } from 'react';
import cn from 'classnames';
import Navbar from '../Navbar';
import Footer from '../Footer';

interface Props {
  className?: string;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar title="TITLE" />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
