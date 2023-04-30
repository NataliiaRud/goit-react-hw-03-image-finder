import PropTypes from 'prop-types';

import React from 'react';
import {
  SearchButton,
  SearchInput,
  SearchContainer,
  SearchForm,
  ButtonLabel,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.elements[1].value);
    e.currentTarget.reset();
  };
  return (
    <SearchContainer className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchButton type="submit" className="button">
          <ButtonLabel className="button-label">Search</ButtonLabel>
        </SearchButton>

        <SearchInput
          className="input"
          type="text"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchContainer>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
