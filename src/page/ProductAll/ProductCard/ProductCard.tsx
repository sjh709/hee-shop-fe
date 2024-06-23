import React from 'react';
import './ProductCard.style.css';
import { currencyFormat } from '../../../utils/number';
import { ProductListType } from '../../../model/product';
import { useNavigate } from 'react-router-dom';

interface OwnProps {
  item: ProductListType;
}

function ProductCard({ item }: OwnProps) {
  const navigate = useNavigate();

  const showProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className='product-card' onClick={() => showProduct(item._id)}>
      <img src={item.image} className='card-img' />
      <div className='card-title'>{item.name}</div>
      <div>&#8361; {currencyFormat(item.price)}</div>
    </div>
  );
}

export default ProductCard;
