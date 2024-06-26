import React from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { GetOrderListType } from '../../../model/order';
import { currencyFormat } from '../../../utils/number';
import { badgeBg } from '../../../constants/order.constants';
import './OrderTable.style.css';

interface OwnProps {
  header: string[];
  data: GetOrderListType[];
}

function OrderTable({ header, data }: OwnProps) {
  return (
    <Container className='mt-4 product-table order-table'>
      <Row className='header-row'>
        {header.map((title, index) => (
          <Col key={index} className='table-col'>
            {title}
          </Col>
        ))}
      </Row>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Row className='table-row' key={index}>
            <Col className='table-col'>{index}</Col>
            <Col className='table-col'>{item.orderNum}</Col>
            <Col className='table-col'>{item.createdAt.slice(0, 10)}</Col>
            <Col className='table-col'>{item.userId.email}</Col>
            <Col className='table-col'>
              {item.items[0].productId.name}
              {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}
            </Col>
            <Col className='table-col'>
              {item.shipTo.address1 + ' ' + item.shipTo.address2}
            </Col>
            <Col className='table-col'>{currencyFormat(item.totalPrice)}</Col>
            <Col className='table-col'>
              <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
            </Col>
          </Row>
        ))
      ) : (
        <Row>
          <Col>상품이 없습니다.</Col>
        </Row>
      )}
    </Container>
  );
}

export default OrderTable;
