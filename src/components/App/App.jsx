import { Component } from 'react';
import { Container } from './App.styled';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

class App extends Component {
  state = {
    searchValue: '',
    findingImg: [],
    status: 'idle',
    page: 1,
    showBtn: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const KEY = '37067470-11cf8dec766fce25052929d3a';
    const URL_API = `https://pixabay.com/api/?q=${this.state.searchValue}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    const prevValue = prevState.searchValue;
    const nextValue = this.state.searchValue;

    if (prevValue !== nextValue) {
      this.setState({ status: 'panding' });

      fetch(`${URL_API}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(
              `Unfortunately, what you are looking for is not available. Try again`
            )
          );
        })
        .then(findingImg =>
          this.setState({
            findingImg: [...findingImg.hits],
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }      
}



  onSearchSubmit = inputValue => {
    this.setState({ searchValue: inputValue });
       
  };

  loadMore = () => {    
    this.setState(prevState => ({ page: prevState.page + 1 }));   
  };

  render() {
    const { showBtn, searchValue, findingImg, error, status } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {status === 'idle' && <h2>Write what to find.</h2>}
        {status === 'pending' && <div>Loading...</div>}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && (
          <ImageGallery searchValueOn={searchValue} findingImg={findingImg} />
        )}
        {showBtn && <Button onBtnClick={this.loadMore} />}
        <ToastContainer autoClose={1500} />
      </Container>
    );
  }
}

export default App;
