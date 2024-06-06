import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import './RegisterPage.style.css';

function RegisterPage() {
  return (
    <Container className='login-area'>
      <h3 className='login-title'>회원가입</h3>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>이메일</Form.Label>
          <Form.Control type='email' placeholder='이메일을 입력하세요' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>이름</Form.Label>
          <Form.Control type='name' placeholder='이름을 입력하세요' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type='password' placeholder='비밀번호를 입력하세요' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='이용약관에 동의합니다' />
        </Form.Group>

        <Button variant='primary' type='submit'>
          회원가입
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterPage;
