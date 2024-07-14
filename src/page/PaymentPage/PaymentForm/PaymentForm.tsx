import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Cards from 'react-credit-cards-2';

interface OwnProps {
  handleInputFocus: any;
  cardValue: any;
  handlePaymentInfoChange: any;
}

function PaymentForm({
  handleInputFocus,
  cardValue,
  handlePaymentInfoChange,
}: OwnProps) {
  return (
    <Row className='display-flex'>
      <Col xl={6} className='mb-3'>
        <Cards
          number={cardValue.number}
          expiry={cardValue.expiry}
          cvc={cardValue.cvc}
          name={cardValue.name}
          focused={cardValue.focus}
        />
      </Col>
      <Col xl={6}>
        <div>
          <Form.Control
            type='tel'
            name='number'
            placeholder='Card Number'
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            maxLength={16}
            minLength={16}
            value={cardValue.number}
            className='mb-2'
          />

          <Form.Control
            type='text'
            name='name'
            placeholder='Name'
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            value={cardValue.name}
            className='mb-2'
          />

          <Row>
            <Col>
              <Form.Control
                type='text'
                name='expiry'
                placeholder='MM/DD'
                onChange={handlePaymentInfoChange}
                onFocus={handleInputFocus}
                required
                value={cardValue.expiry}
                maxLength={7}
              />
            </Col>
            <Col>
              <Form.Control
                type='text'
                name='cvc'
                placeholder='CVC'
                onChange={handlePaymentInfoChange}
                onFocus={handleInputFocus}
                required
                value={cardValue.cvc}
                maxLength={3}
              />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default PaymentForm;
