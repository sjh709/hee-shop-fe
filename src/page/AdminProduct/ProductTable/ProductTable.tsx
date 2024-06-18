import React from 'react';
import './ProductTable.style.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ProductListType } from '../../../model/product';
import { currencyFormat } from '../../../utils/number';

interface OwnProps {
  header: string[];
  data: ProductListType[];
}

function ProductTable({ header, data }: OwnProps) {
  return (
    <Container className='mt-4 product-table'>
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
            <Col className='table-col'>{item.sku}</Col>
            <Col className='table-col'>{item.name}</Col>
            <Col className='table-col'>{currencyFormat(item.price)}</Col>
            <Col className='table-col'>
              {Object.keys(item.stock).map((size, index) => (
                <div key={index}>
                  {size}: {item.stock[size]}
                </div>
              ))}
            </Col>
            <Col className='table-col'>
              <img src={item.image} width={100} alt='image' />
            </Col>
            <Col className='table-col'>{item.status}</Col>
            <Col className='table-col'>
              <Button size='sm' className='me-2' variant='danger'>
                -
              </Button>
              <Button size='sm' variant='secondary'>
                Edit
              </Button>
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

export default ProductTable;
