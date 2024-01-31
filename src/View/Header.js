import React from 'react';
import Searchbar from './Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Header({ searchQuery, onSearchChange }) {
  return (
    <div className="header">
        <Searchbar searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <div className="notification-icon">
        <FontAwesomeIcon icon={faBell} />
      </div>
      
    </div>
  );
}

export default Header;
