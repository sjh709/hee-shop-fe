import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Button, Container } from 'react-bootstrap';
import ProductTable from './ProductTable/ProductTable';
import './AdminProduct.style.css';
import NewItemDialog from './NewItemDialog/NewItemDialog';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../redux/actions/productAction';
import { RootState } from '../../redux/store';

function AdminProduct() {
  const [mode, setMode] = useState<string>('new');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { productList } = useSelector((state: RootState) => state.product);
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

  useEffect(() => {
    dispatch(productActions.getProductList());
  }, []);

  return (
    <>
      <Container className='admin-product'>
        <div className='search-box mt-3'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
          <input type='text' placeholder='제품 이름으로 검색' />
        </div>
        <Button variant='primary' className='mt-3' onClick={handleClickNewItem}>
          Add New Item +
        </Button>
        <ProductTable header={tableHeader} data={productList} />
      </Container>
      <NewItemDialog showDialog={showDialog} setShowDialog={setShowDialog} />
    </>
  );
}

export default AdminProduct;
