import React from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './Paginate.style.css';
import { SearchQueryType } from '../../model/product';

interface OwnProps {
  handlePageClick: (selectedItem: { selected: number }) => void;
  totalPageNum: number;
  searchQuery: SearchQueryType;
}

function Paginate({ handlePageClick, totalPageNum, searchQuery }: OwnProps) {
  return (
    <ReactPaginate
      previousLabel={<FontAwesomeIcon icon={faCircleChevronLeft} />}
      nextLabel={<FontAwesomeIcon icon={faCircleChevronRight} />}
      pageCount={totalPageNum}
      containerClassName='pagination'
      pageLinkClassName='pagination-link'
      activeLinkClassName='pagination-link-active'
      onPageChange={handlePageClick}
      forcePage={Number(searchQuery.page) - 1}
    />
  );
}

export default Paginate;
