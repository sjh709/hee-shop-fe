import React from 'react';
import './PaymentPage.style.css';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';

function PaymentPage() {
  return (
    <Container>
      <Row className='payment-area'>
        <Col md={7}>
          <div>
            <h2>배송 주소</h2>
            <Form>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='lastName'>
                  <Form.Label>성</Form.Label>
                  <Form.Control type='text' name='lastName' required />
                </Form.Group>

                <Form.Group as={Col} controlId='firstName'>
                  <Form.Label>이름</Form.Label>
                  <Form.Control type='text' name='firstName' required />
                </Form.Group>
              </Row>

              <Form.Group controlId='contact' className='mb-3'>
                <Form.Label>연락처</Form.Label>
                <Form.Control
                  type='text'
                  name='contact'
                  placeholder='010-xxxx-xxxx'
                  required
                />
              </Form.Group>

              <Form.Group controlId='address1' className='mb-3'>
                <Form.Label>주소</Form.Label>
                <Form.Control type='text' name='address1' required />
              </Form.Group>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='address2'>
                  <Form.Label>상세주소</Form.Label>
                  <Form.Control type='text' name='address2' required />
                </Form.Group>

                <Form.Group as={Col} controlId='zip'>
                  <Form.Label>우편번호</Form.Label>
                  <Form.Control type='text' name='zip' required />
                </Form.Group>
              </Row>

              <div>
                <h2 className='payment-title'>결제 정보</h2>
              </div>

              <Button
                variant='primary'
                type='submit'
                className='payment-button'
              >
                결제하기
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={5}>
          <h2>주문 내역</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentPage;
