import React from 'react';
import './OrderReceipt.style.css';
import { Button } from 'react-bootstrap';

function OrderReceipt() {
  return (
    <div className='receipt-container'>
      <h3 className='receipt-title'>주문 내역</h3>
      <ul className='receipt-list'>
        <li>
          <div className='display-flex'>
            <div>프린트 티셔츠</div>
            <div>&#8361; 45,000</div>
          </div>
        </li>
      </ul>
      <div className='display-flex mb-3'>
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>&#8361; 45,000</strong>
        </div>
      </div>
      <Button className='payment-button'>결제 계속하기</Button>
    </div>
  );
}

export default OrderReceipt;
