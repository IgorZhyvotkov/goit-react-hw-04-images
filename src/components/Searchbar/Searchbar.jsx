import { Component } from 'react';
import { toast } from 'react-toastify';

import { BsSearch } from 'react-icons/bs';
import {
  SearchbarStyled,
  SearchbarForm,
  SearchbarBtn,
  SearchbarInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onChange = ({ target }) => {
    this.setState({ inputValue: target.value.toLowerCase() });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast('Oops try again!');
      return;
    }

    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchbarForm onSubmit={this.onSubmit}>
          <SearchbarBtn type="submit" className="button">
            <BsSearch />
          </SearchbarBtn>

          <SearchbarInput
            type="text"
            name="search"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.onChange}
          />
        </SearchbarForm>
      </SearchbarStyled>
    );
  }
}

export default Searchbar;
