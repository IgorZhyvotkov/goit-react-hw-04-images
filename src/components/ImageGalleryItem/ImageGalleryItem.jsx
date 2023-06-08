import { Component } from "react";
import Modal from 'components/Modal';

import { ImageGalleryItemSt, ImageGalleryItemImg } from "./ImageGalleryItem.styled";

class ImageGalleryItem extends Component   {

state = {
  showModal: false,
}

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };
  
render() {
  const {id, webformatURL, largeImageURL} = this.props;

  return (
    <ImageGalleryItemSt onClick={this.toggleModal}>
      <ImageGalleryItemImg src={webformatURL} alt="img" />  
      {this.state.showModal && <Modal onClose={this.toggleModal} url={largeImageURL} />}    
    </ImageGalleryItemSt>
    
  );
}
};

export default ImageGalleryItem;
