import React, { useState } from 'react';
import './PaymentPage.style.css';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { CardValueType, ShipInfoType } from '../../model/order';
import PaymentForm from './PaymentForm/PaymentForm';
import { cc_expires_format } from '../../utils/number';
import OrderReceipt from '../../components/OrderReceipt/OrderReceipt';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { orderActions } from '../../redux/actions/orderAction';

function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shipInfo, setShipInfo] = useState<ShipInfoType>({
    firstName: '',
    lastName: '',
    contact: '',
    address1: '',
    address2: '',
    zip: '',
  });
  const [cardValue, setCardValue] = useState<CardValueType>({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const { cartList, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShipInfo({ ...shipInfo, [name]: value });
  };

  const handleInputFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardValue({ ...cardValue, focus: event.target.name });
  };

  const handlePaymentInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'expiry') {
      let newValue = cc_expires_format(value);
      setCardValue({ ...cardValue, [name]: newValue });
      return;
    }
    setCardValue({ ...cardValue, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, contact, address1, address2, zip } = shipInfo;
    const data = {
      totalPrice,
      shipTo: { address1, address2, zip },
      contact: { firstName, lastName, contact },
      orderList: cartList.map((item) => {
        return {
          productId: item.productId._id,
          price: item.productId.price,
          qty: item.qty,
          size: item.size,
        };
      }),
    };
    dispatch(orderActions.createOrder(data, navigate));
  };

  if (cartList.length === 0) {
    navigate('/cart');
  }

  return (
    <Container>
      <Row>
        <Col md={7} className='payment-area'>
          <div>
            <h2>배송 주소</h2>
            <Form onSubmit={handleSubmit}>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='lastName'>
                  <Form.Label>성</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={handleFormChange}
                    name='lastName'
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='firstName'>
                  <Form.Label>이름</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={handleFormChange}
                    name='firstName'
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group controlId='contact' className='mb-3'>
                <Form.Label>연락처</Form.Label>
                <Form.Control
                  type='text'
                  onChange={handleFormChange}
                  name='contact'
                  placeholder='010-xxxx-xxxx'
                  required
                />
              </Form.Group>

              <Form.Group controlId='address1' className='mb-3'>
                <Form.Label>주소</Form.Label>
                <Form.Control
                  type='text'
                  onChange={handleFormChange}
                  name='address1'
                  required
                />
              </Form.Group>

              <Row className='mb-3'>
                <Form.Group as={Col} controlId='address2'>
                  <Form.Label>상세주소</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={handleFormChange}
                    name='address2'
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='zip'>
                  <Form.Label>우편번호</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={handleFormChange}
                    name='zip'
                    required
                  />
                </Form.Group>
              </Row>

              <div>
                <h2 className='payment-title'>결제 정보</h2>
                <PaymentForm
                  handleInputFocus={handleInputFocus}
                  cardValue={cardValue}
                  handlePaymentInfoChange={handlePaymentInfoChange}
                />
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
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentPage;
