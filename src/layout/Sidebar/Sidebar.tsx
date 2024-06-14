import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.style.css';

function NavbarContent() {
  const navigate = useNavigate();

  return (
    <div>
      <Link to='/' className='sidebar-logo'>
        H#
      </Link>
      <div className='sidebar-title'>Admin Account</div>
      <ul>
        <li className='sidebar-item' onClick={() => navigate('/admin/product')}>
          Product
        </li>
        <li className='sidebar-item' onClick={() => navigate('/admin/order')}>
          Order
        </li>
      </ul>
    </div>
  );
}

function Sidebar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSelectMenu = (url: string) => {
    setShow(false);
    navigate(url);
  };

  return (
    <div className='admin-sidebar'>
      <div className='navbar-content'>{NavbarContent()}</div>

      <div className='mobile-sidebar-nav'>
        <Link to='/' className='mobile-sidebar-logo'>
          H#
        </Link>
        <div className='mobile-menu'>
          <FontAwesomeIcon icon={faBars} onClick={() => setShow(true)} />
        </div>
      </div>

      <div className={`side-menu ${show ? 'open' : ''}`}>
        <button className='close-btn' onClick={() => setShow(!show)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className='mobile-sidebar-content'>
          <Link to='/' className='mobile-sidebar-logo'>
            H#
          </Link>
          <div className='sidebar-title'>Admin Account</div>
          <ul>
            <li
              className='sidebar-item'
              onClick={() => handleSelectMenu('/admin/product')}
            >
              Product
            </li>
            <li
              className='sidebar-item'
              onClick={() => handleSelectMenu('/admin/order')}
            >
              Order
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`side-menu-bg ${show ? 'open' : ''}`}
        onClick={() => setShow(!show)}
      />
    </div>
  );
}

export default Sidebar;
