import Card from '../components/Card.js';
import { api } from '../components/Api.js';



const createCard = (name, link, likes, _id, userId, ownerId, popupWithImage, confirmPopup) => {
  const card = new Card({
    name: name,
    link: link,
    likes: likes,
    cardId: _id,
    userId: userId,
    ownerId: ownerId,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: (_id) => {
      confirmPopup.open()
      confirmPopup.updateSubmitFormConfirmation(() => {
        api.deleteCard(_id)
          .then(res => {
            card.removeElement();
            confirmPopup.close()
          })
          .catch((err) => console.log(`Удаление завершилось ошибкой: ${err}`))
      })
    },
    handlelikeClick: () => {
      if (card.isLiked()) {
        api.deleteCardLike(_id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch((err) => console.log(`Удаление лайка завершилось ошибкой: ${err}`))
      } else {
        api.addCardLike(_id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch((err) => console.log(`Поставить лайк не удалось - ошибка: ${err}`))
      }
    }
  }, '#element-template');
  const cardElement = card.generateCard();
  return cardElement;
}


export { createCard };


