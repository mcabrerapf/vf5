import React, { useEffect, useRef } from 'react';
import './ModalContextWrapper.scss';
import { ModalContextProvider } from './ModalContext';
import Modal from '../../Components/Modals/Modal';

function ModalContextWrapper({
  children,
  showModal,
  closeOnBgClick = true,
  closeModal = () => { }
}) {
  const backgroundRef = useRef(null);
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside({ target }) {

      if (!closeOnBgClick) return;
      const shouldHideModal = wrapperRef.current && !wrapperRef.current.contains(target);
      if (shouldHideModal) closeModal();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, closeModal, closeOnBgClick]);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  if (!showModal) return null;

  return (
    <div
      ref={backgroundRef}
      className="modal-bg"
      onTouchStart={stopPropagation}
      onTouchMove={stopPropagation}
      onTouchEnd={stopPropagation}
    >
      <div
        ref={wrapperRef}
        className='modal-bg__wrapper'
      >
        <ModalContextProvider
          value={{
            closeModal,
          }}
        >
          <Modal>
            {children}
          </Modal>
        </ModalContextProvider>
      </div>
    </div>
  );
}

export default ModalContextWrapper;
