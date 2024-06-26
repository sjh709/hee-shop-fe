import React from 'react';
import './OrderStatusCard.style.css';
import { Badge, Col, Row } from 'react-bootstrap';
import { currencyFormat } from '../../../utils/number';
import { GetOrderType } from '../../../model/order';
import { badgeBg } from '../../../constants/order.constants';

interface OwnProps {
  orderItem: GetOrderType;
}

function OrderStatusCard({ orderItem }: OwnProps) {
  return (
    <div>
      <Row className='status-card'>
        <Col md={2}>
          <img
            src={orderItem.items[0]?.productId?.image}
            alt={orderItem.items[0]?.productId?.image}
            height={96}
          />
        </Col>
        <Col md={8}>
          <div>주문번호: {orderItem.orderNum}</div>
          <div className='text-12 mb-1'>{orderItem.createdAt.slice(0, 10)}</div>
          <div>
            {orderItem.items[0]?.productId?.name}
            {orderItem.items.length > 1 &&
              ` 외 ${orderItem.items.length - 1}개`}
          </div>
          <div>&#8361; {currencyFormat(orderItem.totalPrice)}</div>
        </Col>
        <Col md={2} className='order-status-center'>
          <div className='text-12 mb-1'>주문상태</div>
          <Badge bg={badgeBg[orderItem.status]}>{orderItem.status}</Badge>
        </Col>
      </Row>
    </div>
  );
}

export default OrderStatusCard;
