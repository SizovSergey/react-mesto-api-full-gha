import React from 'react';
import Popup from './Popup';

function InfoTooltip({ isOpen, onClose, loggedIn, message }) {

  return (
    <Popup
      name='infoTooltip'
      isOpen={isOpen}
      onClose={onClose}
      loggedIn={loggedIn}
    >
      <img src={message.image} alt={message.alt} className='popup__icon' />
      <p className='popup__text'>{message.text}</p>

    </Popup >
  );
}

export default InfoTooltip;