import React, { useEffect } from 'react';
import './CartPage.style.css';
import { Container, Row, Col } from 'react-bootstrap';
import OrderReceipt from '../../components/OrderReceipt/OrderReceipt';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../redux/actions/cartAction';
import { RootState } from '../../redux/store';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import CartProductCard from './CartProductCard/CartProductCard';

function CartPage() {
  const dispatch = useDispatch();
  const { cartList, loading, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(cartActions.getCartList());
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Row>
        <Col md={7} className='cart-card-margin'>
          {cartList.length > 0 ? (
            cartList.map((item) => (
              <CartProductCard item={item} key={item._id} />
            ))
          ) : (
            <div className='text-align-center empty-bag'>
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>
          )}
        </Col>
        <Col md={5}>
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
