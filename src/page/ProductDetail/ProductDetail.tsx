import React, { useEffect, useState } from 'react';
import './ProductDetail.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../redux/actions/productAction';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import { currencyFormat } from '../../utils/number';
import { cartActions } from '../../redux/actions/cartAction';

function ProductDetail() {
  const [size, setSize] = useState<string>('');
  const [sizeError, setSizeError] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const { selectedProduct, loading } = useSelector(
    (state: RootState) => state.product
  );

  const selectSize = (value: string) => {
    if (sizeError) setSizeError(false);
    setSize(value);
  };

  const addItemToCart = () => {
    // 사이즈를 선택안했다면 에러
    if (size === '') {
      setSizeError(true);
      return;
    }
    // 로그인을 안했으면 로그인페이지로
    if (!user) navigate('/login');
    // 카트에 아이템 추가
    dispatch(cartActions.addToCart({ id, size }));
  };

  useEffect(() => {
    dispatch(productActions.getProductDetail(id));
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className='my-5'>
      <Row>
        <Col md='6'>
          <img src={selectedProduct?.image} className='detail-img' />
        </Col>
        <Col md='6'>
          <div className='detail-name'>{selectedProduct?.name}</div>
          <div className='detail-price'>
            &#8361; {currencyFormat(selectedProduct?.price)}
          </div>
          <div className='detail-desc'>{selectedProduct?.description}</div>
          <div>
            <Dropdown
              className='drop-down'
              onSelect={(value) => value !== null && selectSize(value)}
            >
              <Dropdown.Toggle
                variant={sizeError ? 'outline-danger' : 'secondary'}
                className='size-drop-down'
              >
                {size ? size.toUpperCase() : '사이즈 선택'}
              </Dropdown.Toggle>
              <Dropdown.Menu className='size-drop-down'>
                {selectedProduct !== null &&
                  Object.keys(selectedProduct?.stock).length > 0 &&
                  Object.keys(selectedProduct?.stock).map((item, index) =>
                    selectedProduct?.stock[item] > 0 ? (
                      <Dropdown.Item eventKey={item} key={index}>
                        {item.toUpperCase()}
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item eventKey={item} disabled={true}>
                        {item.toUpperCase()}
                      </Dropdown.Item>
                    )
                  )}
              </Dropdown.Menu>
            </Dropdown>
            <div className='warning-message'>
              {sizeError && '사이즈를 선택해주세요.'}
            </div>
            <Button className='add-button' onClick={addItemToCart}>
              추가
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
