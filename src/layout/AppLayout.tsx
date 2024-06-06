import React from 'react';
import Navbar from './Navbar/Navbar';
import ToastMessage from './ToastMessage/ToastMessage';

interface OwnProps {
  children: JSX.Element;
}

function AppLayout({ children }: OwnProps) {
  return (
    <div>
      <ToastMessage />
      <Navbar />
      {children}
    </div>
  );
}

export default AppLayout;
