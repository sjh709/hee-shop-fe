import React from 'react';
import { Routes, Route } from 'react-router';
import ProductAll from '../page/ProductAll';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';
import ProductDetail from '../page/ProductDetail';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<ProductAll />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/product/:id' element={<ProductDetail />} />
    </Routes>
  );
}

export default AppRouter;
