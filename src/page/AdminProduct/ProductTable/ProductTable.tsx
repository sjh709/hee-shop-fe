import React from 'react';
import './ProductTable.style.css';
import { Button, Table } from 'react-bootstrap';
import { ProductListType } from '../../../model/product';
import { currencyFormat } from '../../../utils/number';

interface OwnProps {
  header: string[];
  data: ProductListType[];
  openEditForm(product: ProductListType): void;
  deleteItem(id: string): void;
}

function ProductTable({ header, data, openEditForm, deleteItem }: OwnProps) {
  return (
    <div className='overflow-x'>
      <Table className='mt-4 product-table' bordered hover>
        <thead>
          <tr>
            {header.map((title, index) => (
              <th key={index} className='font-weight-500'>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.sku}</td>
                <td style={{ minWidth: '100px' }}>{item.name}</td>
                <td>{currencyFormat(item.price)}</td>
                <td>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size.toUpperCase()}: {item.stock[size]}
                    </div>
                  ))}
                </td>
                <td>
                  <img src={item.image} width={100} alt='image' />
                </td>
                <td>{item.status}</td>
                <td style={{ minWidth: '100px' }}>
                  <Button
                    size='sm'
                    className='me-2'
                    variant='danger'
                    onClick={() => deleteItem(item._id)}
                  >
                    -
                  </Button>
                  <Button
                    size='sm'
                    variant='secondary'
                    onClick={() => openEditForm(item)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className='text-center'>
                상품이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductTable;
