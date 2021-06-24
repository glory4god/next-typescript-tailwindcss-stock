import React, { FC } from 'react';
import cn from 'classnames';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ChatBox from '../../chat/ChatBox';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar title="TITLE" />
      </header>
      <main>{children}</main>
      <ChatBox className="fixed right-2 bottom-2 z-30" />
      <Footer />
    </>
  );
}
