import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faBars,
  faBox,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './Navbar.style.css';
import { UserType } from '../../model/user';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/actions/userAction';
import SearchBox from '../../components/SearchBox/SearchBox';
import { SearchQueryType } from '../../model/product';
import { RootState } from '../../redux/store';
import { cartActions } from '../../redux/actions/cartAction';

function Navbar({ user }: { user: UserType | null }) {
  const menuList = ['Women', 'Men', 'Baby', 'Kids', 'Sport', 'Home'];
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const [query, setQuery] = useSearchParams();
  const { cartItemQty } = useSelector((state: RootState) => state.cart);
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
    name: query.get('name') || '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    setSideOpen(false);
    dispatch(userActions.logout());
  };

  useEffect(() => {
    if (user) {
      dispatch(cartActions.getCartQty());
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery.name === '') {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

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
        {user && user.level === 'admin' && (
          <div className='admin-link'>
            <Link to='/admin/product?page=1'>admin page</Link>
          </div>
        )}
        <div className='nav-header'>
          <div className='burger-menu' onClick={() => setSideOpen(!sideOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <div className='nav-search-box'>
            <SearchBox
              placeholder='검색어를 입력하세요'
              field='name'
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className='nav-icon'>
            <FontAwesomeIcon icon={faUser} />
            {user ? (
              <button onClick={logout}>로그아웃</button>
            ) : (
              <Link to='/login'>로그인</Link>
            )}
          </div>
          <div className='nav-icon'>
            <FontAwesomeIcon icon={faBagShopping} />
            <Link to='/cart'>쇼핑백({cartItemQty || 0})</Link>
          </div>
          <div className='nav-icon'>
            <FontAwesomeIcon icon={faBox} />
            <Link to='/account/purchase'>내 주문</Link>
          </div>
        </div>
      </div>
      <div className={`side-menu ${sideOpen ? 'open' : ''}`}>
        {user && user.level === 'admin' && (
          <div className='side-admin-page'>
            <Link to='/admin/product?page=1'>admin page</Link>
          </div>
        )}
        <button className='close-btn' onClick={() => setSideOpen(!sideOpen)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className='side-search-box'>
          <SearchBox
            placeholder='검색어를 입력하세요'
            field='field'
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
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
            <FontAwesomeIcon icon={faBagShopping} />
            <Link to='/cart'>쇼핑백({cartItemQty || 0})</Link>
          </div>
          <div className='side-menu-icon'>
            <FontAwesomeIcon icon={faBox} />
            <Link to='/account/purchase'>내 주문</Link>
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
