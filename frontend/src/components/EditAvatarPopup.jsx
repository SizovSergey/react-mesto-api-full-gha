import React from 'react';
import PopupWithForm from './PopupWithForm';


const EditAvatarPopup = (props) => {

    const avatarRef = React.useRef('');

    React.useEffect(() => {
      avatarRef.current.value = '';
    }, [props.isOpen]);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      props.onUpdateAvatar(
       avatarRef.current.value
      );
    };

 
    return (
        <PopupWithForm
            title="Обновить аватар"
            name="edit-userAvatar"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__input-container" htmlFor="userAvatar">
                <input ref={avatarRef} defaultValue='' type="url" className="popup__input" id="userAvatar" placeholder="Ссылка на картинку" name="link" required />
                <span id="userAvatar-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;