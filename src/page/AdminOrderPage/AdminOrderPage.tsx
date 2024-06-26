import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchBox from '../../components/SearchBox/SearchBox';
import OrderTable from './OrderTable/OrderTable';
import { useSearchParams } from 'react-router-dom';
import { SearchQueryType } from '../../model/product';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../redux/actions/orderAction';
import { RootState } from '../../redux/store';

function AdminOrderPage() {
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
    orderNum: query.get('orderNum') || '',
  });
  const { adminOrderList } = useSelector((state: RootState) => state.order);
  const tableHeader = [
    '#',
    'Order Num',
    'Order Date',
    'User',
    'Order Item',
    'Address',
    'Total Price',
    'Status',
  ];

  useEffect(() => {
    dispatch(orderActions.getOrderList());
  }, []);

  return (
    <Container className='admin-product'>
      <SearchBox
        placeholder='주문 번호로 검색'
        field='orderNum'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <OrderTable header={tableHeader} data={adminOrderList} />
    </Container>
  );
}

export default AdminOrderPage;
