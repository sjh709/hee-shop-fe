import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ProductTable from './ProductTable/ProductTable';
import './AdminProduct.style.css';
import NewItemDialog from './NewItemDialog/NewItemDialog';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../redux/actions/productAction';
import { RootState } from '../../redux/store';
import SearchBox from '../../components/SearchBox/SearchBox';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductListType, SearchQueryType } from '../../model/product';
import Paginate from '../../components/Paginate/Paginate';
import * as types from '../../constants/product.constants';

function AdminProduct() {
  const [mode, setMode] = useState<string>('new');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [query, setQuery] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
    name: query.get('name') || '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, totalPageNum } = useSelector(
    (state: RootState) => state.product
  );
  const tableHeader = [
    '#',
    'Sku',
    'Name',
    'Price',
    'Stock',
    'Image',
    'Status',
    '',
  ];

  const handleClickNewItem = () => {
    setMode('new');
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setSearchQuery({ ...searchQuery, page: String(selected + 1) });
  };

  const openEditForm = (product: ProductListType) => {
    setMode('edit');
    dispatch({ type: types.SET_SELECTED_PRODUCT, payload: product });
    setShowDialog(true);
  };

  const deleteItem = (id: string) => {
    dispatch(productActions.deleteProduct(id, searchQuery.page));
  };

  useEffect(() => {
    dispatch(productActions.getProductList({ ...searchQuery, pageSize: 3 }));
  }, [query, showDialog]);

  useEffect(() => {
    if (searchQuery.name === '') {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

  return (
    <div>
      <Container className='admin-product' fluid='md'>
        <SearchBox
          placeholder='제품 이름으로 검색'
          field='name'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Button variant='primary' className='mt-3' onClick={handleClickNewItem}>
          Add New Item +
        </Button>
        <ProductTable
          header={tableHeader}
          data={productList}
          openEditForm={openEditForm}
          deleteItem={deleteItem}
        />
      </Container>
      <NewItemDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        mode={mode}
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

export default AdminProduct;
