import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchBox.style.css';
import { SearchQueryType } from '../../model/product';
import { useLocation } from 'react-router-dom';

interface OwnProps {
  placeholder: string;
  field: string;
  searchQuery: SearchQueryType;
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQueryType>>;
  setSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchBox({
  placeholder,
  field,
  searchQuery,
  setSearchQuery,
  setSearchOpen,
}: OwnProps) {
  const [keyword, setKeyword] = useState<string>('');
  const location = useLocation();

  const onCheckEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.nativeEvent.isComposing === false) {
      const value = (event.target as HTMLInputElement).value;
      if (setSearchQuery !== undefined) {
        if (
          location.pathname === '/cart' ||
          location.pathname === '/account/purchase'
        ) {
          setSearchQuery({
            ...searchQuery,
            page: '1',
            cate_no: '',
            [field]: value,
          });
        } else {
          setSearchQuery({
            ...searchQuery,
            page: '1',
            [field]: value,
          });
        }
      }
      setKeyword('');
      if (setSearchOpen) setSearchOpen(false);
    }
  };

  return (
    <div className='search-box'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
      <input
        type='text'
        placeholder={placeholder}
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword}
        onKeyDown={onCheckEnter}
      />
    </div>
  );
}

export default SearchBox;
