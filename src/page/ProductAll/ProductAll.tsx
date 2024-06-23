import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Paginate from '../../components/Paginate/Paginate';
import { SearchQueryType } from '../../model/product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { productActions } from '../../redux/actions/productAction';

function ProductAll() {
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: '1',
    name: '',
  });
  const { productList, totalPageNum } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: String(selected + 1) });
  };

  useEffect(() => {
    const page = query.get('page') || '1';
    const name = query.get('name') || '';
    setSearchQuery({ page, name });
    dispatch(productActions.getProductList({ page, name, pageSize: 4 }));
  }, [query]);

  useEffect(() => {
    if (searchQuery.name === '') {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

  return (
    <Container className='mt-5 mb-5'>
      <Row>
        {productList.length > 0 ? (
          productList.map((item, index) => (
            <Col md='3' key={index}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <Col className='text-center'>상품이 없습니다.</Col>
        )}
      </Row>
      <Paginate
        handlePageClick={handlePageClick}
        totalPageNum={totalPageNum}
        searchQuery={searchQuery}
      />
    </Container>
  );
}

export default ProductAll;
