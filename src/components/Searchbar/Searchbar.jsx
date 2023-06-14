import { useState } from 'react';
import { toast } from 'react-toastify';

import { BsSearch } from 'react-icons/bs';
import {
  SearchbarStyled,
  SearchbarForm,
  SearchbarBtn,
  SearchbarInput,
} from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const onChange = ({ target }) => {
    setInputValue(target.value.toLowerCase());
  };

  const onSubmitSerch = e => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      toast('Oops try again!');
      return;
    }

    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <SearchbarStyled>
      <SearchbarForm onSubmit={onSubmitSerch}>
        <SearchbarBtn type="submit" className="button">
          <BsSearch />
        </SearchbarBtn>

        <SearchbarInput
          type="text"
          name="search"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={onChange}
        />
      </SearchbarForm>
    </SearchbarStyled>
  );
}

export default Searchbar;
