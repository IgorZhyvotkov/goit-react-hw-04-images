import { useState, useEffect } from 'react';
import { Container } from './App.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner';
import { getImages } from 'api';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [findingImg, setFindingImg] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [totalPages, setTotalPages] = useState(0);
  const per_page = 12;

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    const fetch = async () => {
      try {
        setStatus(STATUS.PENDING);

        const images = await getImages({ searchValue, page, per_page });

        if (!images.hits.length) {
          throw new Error('No matches found');
        }
        setFindingImg(prevState => [...prevState, ...images.hits]);
        setTotalPages(Math.ceil(images.totalHits / per_page));
        setStatus(STATUS.RESOLVED);
      } catch (error) {
        setStatus(STATUS.REJECTED);
        toast.error(error.message);
      }
    };
    fetch();
  }, [searchValue, page]);

  const onSearchSubmit = inputValue => {
    setSearchValue(inputValue);
    setPage(1);
    setFindingImg([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showBtn = findingImg.length !== 0 && page < totalPages;

  return (
    <Container>
      <Searchbar onSubmit={onSearchSubmit} />
      <ImageGallery findingImg={findingImg} />
      {status === STATUS.PENDING && (
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
      {showBtn && <Button onBtnClick={loadMore} />}
      <ToastContainer autoClose={1500} />
    </Container>
  );
}
export default App;
