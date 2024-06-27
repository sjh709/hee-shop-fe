import React, { useEffect, useState } from 'react';
import './MyPage.style.css';
import { Container } from 'react-bootstrap';
import OrderStatusCard from './OrderStatusCard/OrderStatusCard';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../redux/actions/orderAction';
import { RootState } from '../../redux/store';
import Paginate from '../../components/Paginate/Paginate';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchQueryType } from '../../model/product';

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
  });
  const { orderList, totalPageNum } = useSelector(
    (state: RootState) => state.order
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: String(selected + 1) });
  };

  useEffect(() => {
    dispatch(orderActions.getOrder({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

  if (orderList?.length === 0) {
    return (
      <Container className='no-order-box'>
        <div>진행중인 주문이 없습니다.</div>
      </Container>
    );
  }

  return (
    <>
      <Container className='status-card-container'>
        {orderList.map((item) => (
          <OrderStatusCard orderItem={item} key={item._id} />
        ))}
      </Container>
      <Paginate
        handlePageClick={handlePageClick}
        totalPageNum={totalPageNum}
        searchQuery={searchQuery}
      />
    </>
  );
}

export default MyPage;
