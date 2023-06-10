import { Component } from 'react';
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import { getImages } from 'api';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';

import { ImageGallerySt } from './ImageGallery.styled';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    findingImg: [],
    status: STATUS.IDLE,
    page: 1,
    error: null,
    totalPages: 0,
    per_page: 12,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchValue } = this.props;

    if (prevProps.searchValue !== searchValue) {
      await this.setState({ page: 1, findingImg: [] });
      this.fetchImages();
    }
    if (prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { page, findingImg, per_page } = this.state;
    const { searchValue } = this.props;

    await this.setState({ status: STATUS.PENDING });

    try {
      const images = await getImages({ searchValue, page, per_page });

      if (!images.hits.length) {
        throw new Error('No matches found');
      }
      this.setState({
        findingImg: [...findingImg, ...images.hits],
        totalPages: Math.ceil(images.totalHits / per_page),
        status: STATUS.RESOLVED,
        error: null,
      });
    } catch (error) {
      this.setState({ error: error.message, status: STATUS.REJECTED });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { findingImg, totalPages, error, status, page } = this.state;

    const showBtn = findingImg.length !== 0 && page < totalPages;

    if (status === STATUS.PENDING) {
      return (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      );
    }

    if (status === STATUS.RESOLVED) {
      return (
        <ImageGallerySt>
          {this.state.findingImg.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            );
          })}
          {showBtn && <Button onBtnClick={this.loadMore} />}
        </ImageGallerySt>
      );
    }

    if (status === STATUS.REJECTED) {
      return toast.error(error);
    }
  }
}

export default ImageGallery;
