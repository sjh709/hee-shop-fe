import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <Link to='/register'>회원가입하기</Link>
    </div>
  );
}

export default LoginPage;
