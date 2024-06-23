import React from 'react';
import { Routes, Route } from 'react-router';
import ProductAll from '../page/ProductAll/ProductAll';
import LoginPage from '../page/LoginPage/LoginPage';
import RegisterPage from '../page/RegisterPage/RegisterPage';
import ProductDetail from '../page/ProductDetail/ProductDetail';
import PrivateRoute from './PrivateRoute';
import AdminProduct from '../page/AdminProduct/AdminProduct';
import AdminOrderPage from '../page/AdminOrderPage/AdminOrderPage';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<ProductAll />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/product/:id' element={<ProductDetail />} />
      <Route element={<PrivateRoute permissionLevel='admin' />}>
        <Route path='/admin/product' element={<AdminProduct />} />
        <Route path='/admin/order' element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
