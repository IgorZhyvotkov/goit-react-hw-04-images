import { useState } from 'react';
import Modal from 'components/Modal';

import {
  ImageGalleryItemSt,
  ImageGalleryItemImg,
} from './ImageGalleryItem.styled';

function ImageGalleryItem({ webformatURL, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ImageGalleryItemSt onClick={toggleModal}>
      <ImageGalleryItemImg src={webformatURL} alt="img" />
      {showModal && <Modal onClose={toggleModal} url={largeImageURL} />}
    </ImageGalleryItemSt>
  );
}

export default ImageGalleryItem;
