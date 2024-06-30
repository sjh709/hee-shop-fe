import React from 'react';
import { Badge, Table } from 'react-bootstrap';
import { GetOrderListType } from '../../../model/order';
import { currencyFormat } from '../../../utils/number';
import { badgeBg } from '../../../constants/order.constants';
import './OrderTable.style.css';

interface OwnProps {
  header: string[];
  data: GetOrderListType[];
  openEditForm: (order: GetOrderListType) => void;
}

function OrderTable({ header, data, openEditForm }: OwnProps) {
  return (
    <div className='overflow-x height-100'>
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
              <tr
                key={index}
                className='admin-order-row'
                onClick={() => openEditForm(item)}
              >
                <td>{index}</td>
                <td>{item.orderNum}</td>
                <td>{item.createdAt.slice(0, 10)}</td>
                <td className='text-ellipsis'>{item.userId.email}</td>
                <td>
                  {item.items[0].productId.name}
                  {item.items.length > 1 && ` 외 ${item.items.length - 1}개`}
                </td>
                <td className='text-ellipsis'>
                  {item.shipTo.address1 + ' ' + item.shipTo.address2}
                </td>
                <td>{currencyFormat(item.totalPrice)}</td>
                <td>
                  <Badge bg={badgeBg[item.status]}>{item.status}</Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>상품이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderTable;
