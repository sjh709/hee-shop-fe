import React from 'react';
import './OrderDetailDialog.style.css';
import { Modal, Table, Form, Button } from 'react-bootstrap';
import { ORDER_STATUS } from '../../../constants/order.constants';

interface OwnProps {
  open: boolean;
  handleClose: () => void;
}

function OrderDetailDialog({ open, handleClose }: OwnProps) {
  const submitStatus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submitStatus');
  };
  return (
    <Modal size='lg' show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>주문번호: </div>
        <div>주문일자: </div>
        <div>이메일: </div>
        <div>주소: </div>
        <div>연락처: </div>
        <div>주문내역</div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>name</td>
                <td>price</td>
                <td>qty</td>
                <td>price</td>
              </tr>
              <tr>
                <td colSpan={4}>총계: </td>
                <td>100000</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Form onSubmit={submitStatus}>
        <Modal.Body>
          <Form.Group controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Select>
              {ORDER_STATUS.map((item, idx) => (
                <option key={idx} value={item.toLowerCase()}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default OrderDetailDialog;
