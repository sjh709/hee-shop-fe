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
import { GetOrderListType } from '../../model/order';
import * as types from '../../constants/order.constants';
import OrderDetailDialog from './OrderDetailDialog/OrderDetailDialog';

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
  const [open, setOpen] = useState<boolean>(false);
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

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: String(selected + 1) });
  };

  const openEditForm = (order: GetOrderListType) => {
    setOpen(true);
    dispatch({ type: types.SET_SELECTED_ORDER, payload: order });
  };

  const handleClose = () => setOpen(false);

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
    <div>
      <Container className='admin-product' fluid='md'>
        <SearchBox
          placeholder='주문 번호로 검색'
          field='orderNum'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <OrderTable
          header={tableHeader}
          data={adminOrderList}
          openEditForm={openEditForm}
        />
      </Container>
      <OrderDetailDialog
        open={open}
        handleClose={handleClose}
        searchQuery={searchQuery}
      />
      <Paginate
        handlePageClick={handlePageClick}
        totalPageNum={totalPageNum}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default AdminOrderPage;
