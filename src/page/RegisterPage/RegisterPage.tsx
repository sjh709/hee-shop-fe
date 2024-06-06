import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import './RegisterPage.style.css';
import { Register } from '../../model/user';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [passwordError, setPasswordError] = useState<string>('');
  const [policyError, setPolicyError] = useState<boolean>(false);
  const [formData, setFormData] = useState<Register>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    policy: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { id, value, checked } = event.target;
    if (id === 'policy') {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const register = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { name, email, password, confirmPassword, policy } = formData;
    // 비밀번호 일치하는지 확인
    if (password !== confirmPassword) {
      setPasswordError('비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    // 이용약관 동의했는지 확인
    if (!policy) {
      setPolicyError(true);
      return;
    }
    setPasswordError('');
    setPolicyError(false);
    dispatch(userActions.registerUser({ email, name, password }, navigate));
  };

  return (
    <Container className='register-area'>
      <h3 className='register-title'>회원가입</h3>
      <Form onSubmit={register}>
        <Form.Group className='mb-3'>
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type='email'
            placeholder='이메일을 입력하세요'
            id='email'
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>이름</Form.Label>
          <Form.Control
            type='name'
            placeholder='이름을 입력하세요'
            id='name'
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type='password'
            placeholder='비밀번호를 입력하세요'
            id='password'
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type='password'
            placeholder='비밀번호를 입력하세요'
            id='confirmPassword'
            onChange={handleChange}
            isInvalid={Boolean(passwordError)}
            required
          />
          <Form.Control.Feedback type='invalid'>
            {passwordError}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Check
            type='checkbox'
            label='이용약관에 동의합니다'
            id='policy'
            onChange={handleChange}
            isInvalid={policyError}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          회원가입
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterPage;
