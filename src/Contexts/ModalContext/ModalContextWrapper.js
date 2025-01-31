import React, { useState, useEffect, useRef } from 'react';
import './ModalContextWrapper.scss';
import { ModalContextProvider } from './ModalContext';

function ModalContextWrapper({ children, showModal, closeModal }) {
  const backgroundRef = useRef(null);
  const wrapperRef = useRef(null);
  const [closeOnBgClick, setCloseOnBgClick] = useState(true);

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
      <ModalContextProvider
        value={{
          setCloseOnBgClick,
          closeModal,
        }}
      >
        {children}
      </ModalContextProvider>
    </div>
  );
}

export default ModalContextWrapper;
