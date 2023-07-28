import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {

  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setPlace('');
    setLink('');
  }, [props.isOpen]);

  const handleChangePlace = (e) => {
    setPlace(e.target.value);
  }

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace(place, link);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-elements"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <label className="popup__input-container" htmlFor="place">
        <input value={place} onChange={handleChangePlace} type="text" className="popup__input" id="place" placeholder="Новое место" name="place" minLength="1"
          maxLength="30" required />
        <span id="place-error"></span>
      </label>
      <label className="popup__input-container" htmlFor="link">
        <input value={link} onChange={handleChangeLink} type="url" className="popup__input" id="link" placeholder="Ссылка на картинку" name="link" required />
        <span id="link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;