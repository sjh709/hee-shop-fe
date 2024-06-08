import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import ToastMessage from './ToastMessage/ToastMessage';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/actions/userAction';
import { RootState } from '../redux/store';

interface OwnProps {
  children: JSX.Element;
}

function AppLayout({ children }: OwnProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  return (
    <div>
      <ToastMessage />
      <Navbar user={user} />
      {children}
    </div>
  );
}

export default AppLayout;
