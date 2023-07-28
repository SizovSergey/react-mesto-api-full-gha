import React from 'react';
import usePopupClose from '../hooks/usePopupClose'

const ImagePopup = (props) => {
  usePopupClose(props.card?.link, props.onClose)
    return (
      <div className={`popup ${props.card && 'popup_opened'}`} id="popup_photo">
        {props.card && (
          <figure className="popup__figure">
            <button className="popup__cancel-button" type="button" aria-label="Закрыть окно" onClick={props.onClose}></button>
            <img className="popup__image" src={props.card.link || ''} alt={props.card.name || ''}/>
            <figcaption className="popup__caption">{props.card.name}</figcaption>
          </figure>
        )}
      </div>
    );
  }
  
  export default ImagePopup;