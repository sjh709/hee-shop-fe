import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Paginate from '../../components/Paginate/Paginate';
import { SearchQueryType } from '../../model/product';
import { useSearchParams } from 'react-router-dom';
import { productActions } from '../../redux/actions/productAction';

function ProductAll() {
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
    name: query.get('name') || '',
  });
  const { productList, totalPageNum } = useSelector(
    (state: RootState) => state.product
  );
  const dispatch = useDispatch();

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: String(selected + 1) });
  };

  useEffect(() => {
    console.log('searchQuery');
    dispatch(productActions.getProductList({ ...searchQuery, pageSize: 12 }));
  }, [searchQuery]);

  useEffect(() => {
    const page = query.get('page') || '1';
    const name = query.get('name') || '';
    setSearchQuery({ ...setQuery, page, name });
    dispatch(productActions.getProductList({ ...searchQuery, pageSize: 12 }));
  }, [query]);

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
