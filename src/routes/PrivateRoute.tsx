import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute({ permissionLevel }: { permissionLevel: string }) {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === 'admin';
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;
