import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Paginate from '../../components/Paginate/Paginate';
import { SearchQueryType } from '../../model/product';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function ProductAll() {
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
  });
  const { productList, totalPageNum, loading } = useSelector(
    (state: RootState) => state.product
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: String(selected + 1) });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className='mt-5 mb-5'>
      <Row>
        {productList.length > 0 ? (
          productList.map((item, index) => (
            <Col md={3} sm={12} key={index}>
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
