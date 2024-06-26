import React, { useEffect } from 'react';
import './MyPage.style.css';
import { Container } from 'react-bootstrap';
import OrderStatusCard from './OrderStatusCard/OrderStatusCard';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../redux/actions/orderAction';
import { RootState } from '../../redux/store';

function MyPage() {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(orderActions.getOrder());
  }, []);

  if (orderList?.length === 0) {
    return (
      <Container className='no-order-box'>
        <div>진행중인 주문이 없습니다.</div>
      </Container>
    );
  }

  return (
    <Container className='status-card-container'>
      {orderList.map((item) => (
        <OrderStatusCard orderItem={item} key={item._id} />
      ))}
    </Container>
  );
}

export default MyPage;
