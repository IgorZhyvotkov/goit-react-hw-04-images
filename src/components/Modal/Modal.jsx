import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, ModalSt } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, url }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const hendleBackdropClick = e => {
    if (e.currentTarget !== e.target) {
      return onClose();
    }
  };

  return createPortal(
    <Overlay onClick={hendleBackdropClick}>
      <ModalSt>
        <img src={url} alt="largeImg" />
      </ModalSt>
    </Overlay>,
    modalRoot
  );
}

export default Modal;
