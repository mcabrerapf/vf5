import React from 'react';
import './ModalFooter.scss';

function ModalFooter({ modifier, children }) {
  const className = ['modal-footer', modifier].filter(Boolean).join(' ');

  return (
    <footer className={className}>
      {children}
    </footer>
  );
}

export default ModalFooter;
