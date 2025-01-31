import React from 'react';
import './ModalHeader.scss';

function ModalHeader({ modifier, children }) {
  const className = ['modal-header', modifier].filter(Boolean).join(' ');

  return (
    <header className={className}>
      {children}
    </header>
  );
}

export default ModalHeader;
