import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faBars,
  faBox,
  faUser,
  faXmark,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Navbar.style.css';
import { UserType } from '../../model/user';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/actions/userAction';

function Navbar({ user }: { user: UserType | null }) {
  const menuList = ['Women', 'Men', 'Baby', 'Kids', 'Sport', 'Home'];
  const [sideOpen, setSideOpen] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.logout());
  };

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
      <div>
        <div className='admin-link'>
          <Link to='/'>admin page</Link>
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
            {user ? (
              <button onClick={logout}>로그아웃</button>
            ) : (
              <Link to='/login'>로그인</Link>
            )}
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
      </div>
      <div className={`side-menu ${sideOpen ? 'open' : ''}`}>
        <div className='side-admin-page'>
          <Link to='/'>admin page</Link>
        </div>
        <button className='close-btn' onClick={() => setSideOpen(!sideOpen)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className='side-search-box'>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            className='side-search-bar'
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='side-search-icon'
          />
        </div>
        <ul className='side-menu-list'>
          {menuList.map((menu, index) => (
            <li key={index}>
              <a href='#'>{menu}</a>
            </li>
          ))}
        </ul>
        <div className='side-icon-group'>
          <div className='side-menu-icon'>
            <FontAwesomeIcon icon={faUser} />
            {user ? (
              <button onClick={logout}>로그아웃</button>
            ) : (
              <Link to='/login'>로그인</Link>
            )}
          </div>
          <div className='side-menu-icon'>
            <FontAwesomeIcon icon={faBox} />
            <Link to='/'>내 주문</Link>
          </div>
          <div className='side-menu-icon'>
            <FontAwesomeIcon icon={faBagShopping} />
            <Link to='/'>쇼핑백</Link>
          </div>
        </div>
      </div>
      <div
        className={`side-menu-bg ${sideOpen ? 'open' : ''}`}
        onClick={() => setSideOpen(!sideOpen)}
      />
    </div>
  );
}

export default Navbar;
