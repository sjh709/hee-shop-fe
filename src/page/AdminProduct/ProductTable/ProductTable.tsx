import React from 'react';
import './ProductTable.style.css';
import { Container, Row, Col } from 'react-bootstrap';

interface OwnProps {
  header: string[];
}

function ProductTable({ header }: OwnProps) {
  return (
    <Container className='mt-4 product-table'>
      <Row className='header-row'>
        {header.map((title, index) => (
          <Col key={index} className='table-col'>
            {title}
          </Col>
        ))}
      </Row>
      <Row className='table-row'>
        <Col className='table-col'>1</Col>
        <Col className='table-col'>1</Col>
        <Col className='table-col'>1</Col>
        <Col className='table-col'>1</Col>
        <Col className='table-col'>1</Col>
        <Col className='table-col'>1</Col>
        <Col className='table-col'>1</Col>
        <Col className='table-col'>1</Col>
      </Row>
      <Row className='table-row'>
        <Col className='table-col'>2</Col>
        <Col className='table-col'>2</Col>
        <Col className='table-col'>2</Col>
        <Col className='table-col'>2</Col>
        <Col className='table-col'>2</Col>
        <Col className='table-col'>2</Col>
        <Col className='table-col'>2</Col>
        <Col className='table-col'>1</Col>
      </Row>
    </Container>
  );
}

export default ProductTable;
