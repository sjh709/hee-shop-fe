import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faBars,
  faBox,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.style.css';

function Navbar() {
  const menuList = ['선글라스', '안경'];
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className='nav-bar'>
      <Link to='/' className='nav-logo'>
        H#
      </Link>
      <div className='nav-menu-area'>
        <ul className='nav-menu'>
          {menuList.map((menu, index) => (
            <li key={index} className='nav-menu-item'>
              <a href='#'>{menu}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className='nav-header'>
        <div className='burger-menu' onClick={() => setSideOpen(!sideOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <input
          type='text'
          placeholder='검색어를 입력하세요'
          className='nav-search'
        />
        <div className='nav-icon'>
          <FontAwesomeIcon icon={faUser} />
          <Link to='/login'>로그인</Link>
        </div>
        <div className='nav-icon'>
          <FontAwesomeIcon icon={faBox} />
          <Link to='/'>내 주문</Link>
        </div>
        <div className='nav-icon'>
          <FontAwesomeIcon icon={faBagShopping} />
          <Link to='/'>쇼핑백</Link>
        </div>
      </div>
      <div className={`side-menu ${sideOpen ? 'open' : ''}`}>
        <button className='close-btn' onClick={() => setSideOpen(!sideOpen)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className={`side-menu-bg ${sideOpen ? 'open' : ''}`} />
    </div>
  );
}

export default Navbar;
