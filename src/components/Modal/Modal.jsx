import { Component } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalSt } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  
  hendleBackdropClick = e => {
    if (e.currentTarget !== e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.hendleBackdropClick}>
        <ModalSt><img src={this.props.url} alt="largeImg" /></ModalSt>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
