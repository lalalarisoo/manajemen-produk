import React from 'react';

function FilterBar({ onFilterChange, showDateFilter = false }) {
  const handleAlphabetSort = () => {
    onFilterChange('alphabet');
  };

  const handleDateFilter = (e) => {
    onFilterChange('date', e.target.value);
  };

  return (
    <div className="filter-bar">
      <button onClick={handleAlphabetSort}>Filter Nama A-Z</button>
      
      {showDateFilter && (
        <div className="date-filter">
          <label>Filter Tanggal:</label>
          <select onChange={handleDateFilter}>
            <option value="all">Semua</option>
            <option value="today">Hari Ini</option>
            <option value="yesterday">Kemarin</option>
            <option value="tomorrow">Besok</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default FilterBar;