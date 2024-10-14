import React from 'react';

const Modal = ({ isOpen, onClose, link }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2>Link Created!</h2>
        <p>Your link has been created successfully.</p>
        <p>
          You can view it here: <a href={link} target="_blank" rel="noopener noreferrer">Open Form</a>
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyles = {
  background: '#fff',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

export default Modal;
