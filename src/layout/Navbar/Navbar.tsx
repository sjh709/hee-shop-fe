import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faBars,
  faBox,
  faUser,
  faXmark,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import './Navbar.style.css';
import { UserType } from '../../model/user';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/actions/userAction';
import SearchBox from '../../components/SearchBox/SearchBox';
import { SearchQueryType } from '../../model/product';
import { RootState } from '../../redux/store';
import { cartActions } from '../../redux/actions/cartAction';
import { productActions } from '../../redux/actions/productAction';

function Navbar({ user }: { user: UserType | null }) {
  const menuList = [
    { cate_no: '', cate_nm: '전체' },
    { cate_no: '1', cate_nm: '아우터' },
    { cate_no: '2', cate_nm: '상의' },
    { cate_no: '3', cate_nm: '팬츠' },
    { cate_no: '4', cate_nm: '스커트' },
    { cate_no: '5', cate_nm: '원피스' },
    { cate_no: '6', cate_nm: '패션잡화' },
  ];
  const [sideOpen, setSideOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [query, setQuery] = useSearchParams();
  const { cartItemQty } = useSelector((state: RootState) => state.cart);
  const [searchQuery, setSearchQuery] = useState<SearchQueryType>({
    page: query.get('page') || '1',
    name: query.get('name') || '',
    cate_no: query.get('cate_no') || '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setSideOpen(false);
    dispatch(userActions.logout());
  };

  const handleSelectMenu = (url: string) => {
    setSideOpen(false);
    navigate(url);
  };

  const handleSelectCategory = (cate_no: string) => {
    setSearchQuery({ ...searchQuery, page: '1', cate_no });
  };

  useEffect(() => {
    if (user) {
      dispatch(cartActions.getCartQty());
    }
  }, [user]);

  useEffect(() => {
    if (query.size === 0) {
      dispatch(productActions.getProductList({ page: '1', pageSize: 4 }));
    } else {
      dispatch(productActions.getProductList({ ...searchQuery, pageSize: 4 }));
    }
  }, [query]);

  useEffect(() => {
    if (searchQuery.name === '') {
      delete searchQuery.name;
    }
    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate('?' + query);
  }, [searchQuery]);

  return (
    <div>
      <div className='nav-bar'>
        <Link to='/' className='nav-logo'>
          H#
        </Link>
        <div className='nav-menu-area'>
          <ul className='nav-menu'>
            {menuList.map((menu, index) => (
              <li key={index} className='nav-menu-item'>
                <button onClick={() => handleSelectCategory(menu.cate_no)}>
                  {menu.cate_nm}
                </button>
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
            <div className='mobile-icons'>
              {location.pathname === '/' && (
                <div
                  className='search-menu'
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
              )}
              <div
                className='burger-menu'
                onClick={() => setSideOpen(!sideOpen)}
              >
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
            {location.pathname === '/' && (
              <div className='nav-search-box'>
                <SearchBox
                  placeholder='검색어를 입력하세요'
                  field='name'
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            )}
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
          <ul className='side-menu-list'>
            {menuList.map((menu, index) => (
              <li key={index}>
                <button onClick={() => handleSelectCategory(menu.cate_no)}>
                  {menu.cate_nm}
                </button>
              </li>
            ))}
          </ul>
          <div className='side-icon-group'>
            <div className='side-menu-icon'>
              <FontAwesomeIcon icon={faUser} />
              {user ? (
                <button onClick={logout}>로그아웃</button>
              ) : (
                <button onClick={() => handleSelectMenu('/login')}>
                  로그인
                </button>
              )}
            </div>
            <div className='side-menu-icon'>
              <FontAwesomeIcon icon={faBagShopping} />
              <button onClick={() => handleSelectMenu('/cart')}>
                쇼핑백({cartItemQty || 0})
              </button>
            </div>
            <div className='side-menu-icon'>
              <FontAwesomeIcon icon={faBox} />
              <button onClick={() => handleSelectMenu('/account/purchase')}>
                내 주문
              </button>
            </div>
          </div>
        </div>
        <div
          className={`side-menu-bg ${sideOpen ? 'open' : ''}`}
          onClick={() => setSideOpen(!sideOpen)}
        />
      </div>

      <div className={`search-menu-area ${searchOpen ? 'open' : ''}`}>
        <div className='search-menu-box'>
          <SearchBox
            placeholder='검색어를 입력하세요'
            field='name'
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSearchOpen={setSearchOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
