import React from 'react';
import Navbar from './Navbar/Navbar';

interface OwnProps {
  children: JSX.Element;
}

function AppLayout({ children }: OwnProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default AppLayout;
