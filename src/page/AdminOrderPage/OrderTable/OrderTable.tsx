import React from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { GetOrderListType, OrderTableHeaderType } from '../../../model/order';
import { currencyFormat } from '../../../utils/number';
import { badgeBg } from '../../../constants/order.constants';
import './OrderTable.style.css';

interface OwnProps {
  header: OrderTableHeaderType[];
  data: GetOrderListType[];
  openEditForm: (order: GetOrderListType) => void;
}

function OrderTable({ header, data, openEditForm }: OwnProps) {
  return (
    <Container className='mt-4 product-table order-table'>
      <Row className='header-row'>
        {header.map((item, index) => (
          <Col key={index} className='table-col' md={item.num}>
            {item.title}
          </Col>
        ))}
      </Row>
      {data.length > 0 ? (
        data.map((item, index) => (
          <Row
            className='table-row admin-order-row'
            key={index}
            onClick={() => openEditForm(item)}
          >
            <Col className='table-col' md={1}>
              {index}
            </Col>
            <Col className='table-col' md={2}>
              {item.orderNum}
            </Col>
            <Col className='table-col' md={1}>
              {item.createdAt.slice(0, 10)}
            </Col>
            <Col className='table-col text-ellipsis' md={2}>
              {item.userId.email}
            </Col>
            <Col className='table-col text-ellipsis' md={2}>
              {item.items[0].productId.name}
              {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}
            </Col>
            <Col className='table-col text-ellipsis' md={2}>
              {item.shipTo.address1 + ' ' + item.shipTo.address2}
            </Col>
            <Col className='table-col' md={1}>
              {currencyFormat(item.totalPrice)}
            </Col>
            <Col className='table-col' md={1}>
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
