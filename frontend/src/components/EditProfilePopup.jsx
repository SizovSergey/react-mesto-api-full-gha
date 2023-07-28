import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';


const EditProfilePopup = (props) => {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser,props.isOpen]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (

        <PopupWithForm
            title="Редактировать профиль"
            name="edit-profile"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit ={handleSubmit}
            >
            <label className="popup__input-container" htmlFor="name">
                <input value={name} onChange={handleChangeName} type="text" className="popup__input" id="name" placeholder="Имя" name="name" minLength="2" maxLength="40"
                    required />
                <span id="name-error"></span>
            </label>
            <label className="popup__input-container" htmlFor="job">
                <input value={description} onChange={handleChangeDescription} type="text" className="popup__input" id="job" placeholder="О себе" name="job" minLength="2" maxLength="200"
                    required />
                <span id="job-error"></span>
            </label>
        </PopupWithForm>

    );
}

export default EditProfilePopup;