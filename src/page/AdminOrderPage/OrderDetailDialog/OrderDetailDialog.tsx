import React, { useEffect, useState } from 'react';
import './OrderDetailDialog.style.css';
import { Modal, Table, Form, Button } from 'react-bootstrap';
import { ORDER_STATUS } from '../../../constants/order.constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { currencyFormat } from '../../../utils/number';
import { orderActions } from '../../../redux/actions/orderAction';

interface OwnProps {
  open: boolean;
  handleClose: () => void;
}

function OrderDetailDialog({ open, handleClose }: OwnProps) {
  const selectedOrder = useSelector(
    (state: RootState) => state.order.selectedOrder
  );
  const [orderStatus, setOrderStatus] = useState<string>('');
  const dispatch = useDispatch();

  const submitStatus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedOrder !== null) {
      dispatch(orderActions.updateOrder(selectedOrder?._id, orderStatus));
    }
    handleClose();
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(event.target.value);
  };

  useEffect(() => {
    if (open) {
      if (selectedOrder !== null) {
        setOrderStatus(selectedOrder?.status);
      }
    }
  }, [open]);

  return (
    <Modal size='lg' show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='order-detail-row'>
          주문번호: {selectedOrder?.orderNum}
        </div>
        <div className='order-detail-row'>
          주문일자: {selectedOrder?.createdAt.slice(0, 10)}
        </div>
        <div className='order-detail-row'>
          이메일: {selectedOrder?.userId.email}
        </div>
        <div className='order-detail-row'>
          주소:{' '}
          {selectedOrder?.shipTo.address1 +
            ' ' +
            selectedOrder?.shipTo.address2}
        </div>
        <div>
          연락처:{' '}
          {selectedOrder?.contact.lastName +
            '' +
            selectedOrder?.contact.firstName}{' '}
          {selectedOrder?.contact.contact}
        </div>
      </Modal.Body>
      <Modal.Body>
        <div>주문내역</div>
        <div>
          <Table>
            <thead>
              <tr className='table-border-bottom'>
                <th>ID</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder?.items.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.productId.name}</td>
                  <td>{currencyFormat(item.price)}</td>
                  <td>{item.qty}</td>
                  <td>{currencyFormat(item.price * item.qty)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>총계: </td>
                <td>{currencyFormat(selectedOrder?.totalPrice)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Form onSubmit={submitStatus}>
        <Modal.Body>
          <Form.Group controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={orderStatus}
              onChange={handleStatusChange}
              required
            >
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
