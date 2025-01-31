import React from 'react';
import './Modal.scss';

function Modal({ modifier, children }) {
  const className = ['modal', modifier].filter(Boolean).join(' ');

  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default Modal;
