import React from 'react';
import './OrderReceipt.style.css';
import { Button } from 'react-bootstrap';
import { CartListType } from '../../model/cart';
import { currencyFormat } from '../../utils/number';
import { useLocation, useNavigate } from 'react-router-dom';

interface OwnProps {
  cartList: CartListType[];
  totalPrice: number;
}

function OrderReceipt({ cartList, totalPrice }: OwnProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='receipt-container'>
      <h3 className='receipt-title'>주문 내역</h3>
      <ul className='receipt-list'>
        {cartList.map((item) => (
          <li key={item._id}>
            <div className='display-flex'>
              <div>{item.productId.name}</div>
              <div>
                &#8361; {currencyFormat(item.productId.price * item.qty)}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='display-flex mb-3 total-price'>
        <div>
          <strong>합계:</strong>
        </div>
        <div>
          <strong>&#8361; {currencyFormat(totalPrice)}</strong>
        </div>
      </div>
      {location.pathname.includes('/cart') && cartList.length > 0 && (
        <Button className='payment-button' onClick={() => navigate('/payment')}>
          결제 계속하기
        </Button>
      )}
    </div>
  );
}

export default OrderReceipt;
