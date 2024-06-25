import React from 'react';
import './CartProductCard.style.css';
import { CartListType } from '../../../model/cart';
import { Col, Row, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { currencyFormat } from '../../../utils/number';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../redux/actions/cartAction';

interface OwnProps {
  item: CartListType;
}

function CartProductCard({ item }: OwnProps) {
  const dispatch = useDispatch();

  const deleteCart = (id: string) => {
    dispatch(cartActions.deleteCartItem(id));
  };

  const handleQtyChange = (id: string, value: string) => {
    dispatch(cartActions.updateQty(id, value));
  };

  return (
    <div className='product-card-cart'>
      <Row>
        <Col md={2}>
          <img src={item.productId.image} width={112} />
        </Col>
        <Col md={10}>
          <div className='display-flex'>
            <h3>{item.productId.name}</h3>
            <button
              className='trash-button'
              onClick={() => deleteCart(item._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div className='text-bold mb-1'>
            &#8361; {currencyFormat(item.productId.price)}
          </div>
          <div className='card-content'>사이즈: {item.size.toUpperCase()}</div>
          <div className='card-content'>
            합계: &#8361; {currencyFormat(item.productId.price * item.qty)}
          </div>
          <div className='card-content mt-2'>
            <Form.Select
              className='qty-dropdown'
              onChange={(event) =>
                handleQtyChange(item._id, event.target.value)
              }
              value={item.qty}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Select>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CartProductCard;
