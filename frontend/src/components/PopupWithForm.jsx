import React from 'react';
import Popup from './Popup';

const PopupWithForm = ({ isOpen, onClose, name, title, buttonText, children, onSubmit, onConfirmDelete }) => {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h3 className="popup__title">{title}</h3>
      <form onSubmit={onSubmit} className="popup__form" id={`popupForm_${name}`} name={name}>
        {children}
        <button onClick={onConfirmDelete} className={`popup__submit-button ${name === 'type_delete-card' ? 'popup__submit-button_type-deletePopup' : ''}`} type="submit" >{buttonText}</button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;


