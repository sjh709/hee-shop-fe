import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBox from '../../components/SearchBox/SearchBox';
import OrderTable from './OrderTable/OrderTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchQueryType } from '../../model/product';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../redux/actions/orderAction';
import { RootState } from '../../redux/store';
import Paginate from '../../components/Paginate/Paginate';

function AdminOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
    orderNum: query.get('orderNum') || '',
  });
  const { adminOrderList, totalPageNum } = useSelector(
    (state: RootState) => state.order
  );
  const tableHeader = [
    { title: '#', num: 1 },
    { title: 'Order Num', num: 2 },
    { title: 'Order Date', num: 1 },
    { title: 'User', num: 2 },
    { title: 'Order Item', num: 2 },
    { title: 'Address', num: 2 },
    { title: 'Total Price', num: 1 },
    { title: 'Status', num: 1 },
  ];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: String(selected + 1) });
  };

  useEffect(() => {
    dispatch(orderActions.getOrderList({ ...searchQuery }));
  }, [query]);

  useEffect(() => {
    if (searchQuery.orderNum === '') {
      delete searchQuery.orderNum;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

  return (
    <>
      <Container className='admin-product'>
        <SearchBox
          placeholder='주문 번호로 검색'
          field='orderNum'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <OrderTable header={tableHeader} data={adminOrderList} />
      </Container>
      <Paginate
        handlePageClick={handlePageClick}
        totalPageNum={totalPageNum}
        searchQuery={searchQuery}
      />
    </>
  );
}

export default AdminOrderPage;
