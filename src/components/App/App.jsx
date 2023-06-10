import { Component } from 'react';
import { Container } from './App.styled';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = {
    searchValue: '',
  };

  onSearchSubmit = inputValue => {
    this.setState({ searchValue: inputValue });
  };

  render() {
    const {  searchValue } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery searchValue={searchValue}/>
        <ToastContainer autoClose={1500} />
      </Container>
    );
  }
}

export default App;
