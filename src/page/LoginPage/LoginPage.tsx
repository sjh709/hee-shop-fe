import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/actions/userAction';
import { RootState } from '../../redux/store';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const error = useSelector((state: RootState) => state.user.error);
  const loading = useSelector((state: RootState) => state.user.loading);

  const loginWithEmail = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(userActions.loginWithEmail({ email, password }));
  };

  const handleGoogleLogin = async (googleData: CredentialResponse) => {
    dispatch(userActions.loginWithGoogle(googleData.credential || ''));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className='login-area'>
      <h3 className='login-title'>로그인</h3>
      {error && <Alert variant='danger'>{error}</Alert>}
      <Form onSubmit={loginWithEmail}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type='email'
            placeholder='이메일을 입력하세요'
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type='password'
            placeholder='비밀번호를 입력하세요'
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <div className='login-button-group'>
          <Button variant='primary' type='submit'>
            로그인
          </Button>
          <div>
            아직 계정이 없으세요?
            <Link to='/register' className='register-link'>
              회원가입 하기
            </Link>
          </div>
        </div>

        <div className='social-login'>
          <p>- 외부 계정으로 로그인하기 -</p>
          <div className='google-login'>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default LoginPage;
