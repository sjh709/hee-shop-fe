import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import ToastMessage from './ToastMessage/ToastMessage';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/actions/userAction';
import { RootState } from '../redux/store';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Sidebar from './Sidebar/Sidebar';
import './AppLayout.style.css';

interface OwnProps {
  children: JSX.Element;
}

function AppLayout({ children }: OwnProps) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(userActions.loginWithToken());
  }, []);

  return (
    <div>
      <ToastMessage />
      {location.pathname.includes('admin') ? (
        <Row className='sidebar-row'>
          <Col xs={12} md={3} className='sidebar mobile-sidebar'>
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
        </Row>
      ) : (
        <>
          <Navbar user={user} />
          {children}
        </>
      )}
    </div>
  );
}

export default AppLayout;
