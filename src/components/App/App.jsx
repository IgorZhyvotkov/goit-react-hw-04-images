import { Component } from 'react';
import { Container } from './App.styled';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';

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
    const { page, searchValue } = this.state;
    const prevValue = prevState.searchValue;

    const KEY = '37067470-11cf8dec766fce25052929d3a';
    const URL_API = `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    if (prevValue !== searchValue || prevState.page !== page) {
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
            findingImg:
              page !== 1
                ? [...prevState.findingImg, ...findingImg.hits]
                : [...findingImg.hits],
            showBtn:
              findingImg.hits.length > 0 &&
              page < Math.ceil(findingImg.total / 12),
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
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && (
          <ImageGallery searchValueOn={searchValue} findingImg={findingImg} />
        )}
          {status === 'pending' && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {showBtn && <Button onBtnClick={this.loadMore} />}
        <ToastContainer autoClose={1500} />
      </Container>
    );
  }
}

export default App;
