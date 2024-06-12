import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.style.css';

function NavbarContent() {
  return (
    <div>
      <Link to='/' className='sidebar-logo'>
        H#
      </Link>
      <div className='sidebar-title'>Admin Account</div>
      <ul>
        <li className='sidebar-item'>Product</li>
        <li className='sidebar-item'>Order</li>
      </ul>
    </div>
  );
}

function Sidebar() {
  return (
    <div className='admin-sidebar'>
      <div className='navbar-content'>{NavbarContent()}</div>

      <div className='mobile-sidebar-nav'>
        <Link to='/' className='mobile-sidebar-logo'>
          H#
        </Link>
        <div className='mobile-menu'>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
