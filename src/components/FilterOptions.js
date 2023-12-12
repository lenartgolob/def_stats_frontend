import React from 'react';

const FilterOptions = ({ filters, onFilterChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ marginRight: '10px' }}>
        <input type="checkbox" checked={filters.all} onChange={() => onFilterChange('all')} />
        All
      </label>
      <label style={{ marginRight: '10px' }}>
        <input type="checkbox" checked={filters.guards} onChange={() => onFilterChange('guards')} />
        Guards
      </label>
      <label style={{ marginRight: '10px' }}>
        <input type="checkbox" checked={filters.forwards} onChange={() => onFilterChange('forwards')} />
        Forwards
      </label>
      <label>
        <input type="checkbox" checked={filters.centers} onChange={() => onFilterChange('centers')} />
        Centers
      </label>
    </div>
  );
};

export default FilterOptions;
