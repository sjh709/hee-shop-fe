import React from 'react';
import './ProductCard.style.css';
import { currencyFormat } from '../../../utils/number';
import { ProductListType } from '../../../model/product';

interface OwnProps {
  item: ProductListType;
}

function ProductCard({ item }: OwnProps) {
  return (
    <div className='product-card'>
      <img src={item.image} className='card-img' />
      <div className='card-title'>{item.name}</div>
      <div>&#8361; {currencyFormat(item.price)}</div>
    </div>
  );
}

export default ProductCard;
