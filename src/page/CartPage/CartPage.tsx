import React from 'react';
import './CartPage.style.css';
import { Container, Row, Col } from 'react-bootstrap';
import OrderReceipt from './OrderReceipt/OrderReceipt';

function CartPage() {
  return (
    <Container>
      <Row>
        <Col md={7}>
          <div className='text-align-center empty-bag'>
            <h2>카트가 비어있습니다.</h2>
            <div>상품을 담아주세요!</div>
          </div>
        </Col>
        <Col md={5}>
          <OrderReceipt />
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
