import React from 'react';
import PopupWithForm from './PopupWithForm';

const DeletePlacePopup = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return (

    <PopupWithForm
      title="Вы уверены?"
      name="type_delete-card"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );

}

export default DeletePlacePopup;