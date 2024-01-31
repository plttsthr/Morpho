// SearchBar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar">
      <input

        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearchChange}
      />
      <button className="search-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}

export default SearchBar;
