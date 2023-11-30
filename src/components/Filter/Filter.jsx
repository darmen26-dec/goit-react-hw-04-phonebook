import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, addFilter }) => (
  <div>
    <input
      type="text"
      name="filter"
      className={css.filter}
      value={filter}
      onChange={addFilter}
      placeholder="Enter name"
    />
  </div>
);

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  addFilter: PropTypes.func,
};

export default Filter;
