import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';


const Card = (props) => {

    const currentUser = React.useContext(CurrentUserContext);


    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__button-like ${isLiked && 'element__button-like_active'}`
    );;


    const handleCardClick = () => {
        props.onCardClick(props.card);
    }


    const handleLikeClick = () => {
        props.onCardLike(props.card)
    }

    const handleOpenDeletePopup = () => {
        props.onConfirmDelete(props.card)
    }

    return (
        <div className="element">
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleCardClick} />
            {isOwn && <button className="element__button-remove" type="button" aria-label="Удалить карточку с картинкой" onClick={handleOpenDeletePopup}></button>}
            <div className="element__content">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-container">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк"></button>
                    <span className="element__like-count">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;