import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoginPage.style.css';

function LoginPage() {
  return (
    <Container className='login-area'>
      <h3 className='login-title'>로그인</h3>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>이메일</Form.Label>
          <Form.Control type='email' placeholder='이메일을 입력하세요' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type='password' placeholder='비밀번호를 입력하세요' />
        </Form.Group>

        <div className='login-button-group'>
          <Button variant='primary' type='submit'>
            로그인
          </Button>
          <div>
            아직 계정이 없으세요?
            <Link to='/register' className='gegister-link'>
              회원가입 하기
            </Link>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default LoginPage;
