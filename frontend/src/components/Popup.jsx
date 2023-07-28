import React from 'react';
import usePopupClose from '../hooks/usePopupClose';

const Popup = ({ isOpen, name, onClose, children }) => {

  usePopupClose(isOpen, onClose);

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`} id={`popup_${name}`}
    >
    <div className={`popup__container ${name === 'edit-userAvatar' ? 'popup__container_type-userAvatar' : ''} 
       ${name === 'type_delete-card' ? 'popup__container_type-delete' : ''}`}>
        {children}
        <button className="popup__cancel-button" 
        type="button" 
        onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
