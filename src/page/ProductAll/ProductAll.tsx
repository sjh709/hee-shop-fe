import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Paginate from '../../components/Paginate/Paginate';
import { SearchQueryType } from '../../model/product';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { productActions } from '../../redux/actions/productAction';

function ProductAll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
    name: query.get('name') || '',
    cate_no: query.get('cate_no') || '',
  });
  const { productList, totalPageNum, loading } = useSelector(
    (state: RootState) => state.product
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: String(selected + 1) });
  };

  useEffect(() => {
    const page = query.get('page') || '1';
    const name = query.get('name') || '';
    const cate_no = query.get('cate_no') || '';
    dispatch(
      productActions.getProductList({ page, name, cate_no, pageSize: 8 })
    );
    setSearchQuery({ ...searchQuery, page, name, cate_no });
  }, [query]);

  useEffect(() => {
    if (searchQuery.name === '') {
      delete searchQuery.name;
    }
    if (searchQuery.cate_no === '') {
      delete searchQuery.cate_no;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('/?' + query);
  }, [searchQuery]);

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
