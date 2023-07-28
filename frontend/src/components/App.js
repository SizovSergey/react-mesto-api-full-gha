import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/auth';
import succesImg from '../images/succes.svg';
import errorImg from '../images/error.svg';
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [email, setEmail] = React.useState('');
  const [cards, setInitialCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = React.useState(false);
  const [message, setMessage] = React.useState({
    image: '',
    text: '',
    alt: ''
  });
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddLocationPopup] = React.useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopup] = React.useState({ isOpen: false, card: {} });
  const [selectedCard, setSelectedCard] = React.useState(undefined);



  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserinfo(),
        api.getInitialCards()
      ])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          setInitialCards(cards);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [loggedIn])

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleAddNewPlaceClick = () => {
    setAddLocationPopup(true);
  }


  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleConfirmDelete = (card) => {
    setDeletePlacePopup({ isOpen: true, card: card })
  }

  const closeAllPopups = () => {
    setEditProfilePopup(false);
    setEditAvatarPopup(false);
    setAddLocationPopup(false);
    setDeletePlacePopup({ isOpen: false, card: {} });
    setSelectedCard(undefined);
    setInfoTooltipPopup(false)
  }

  const handleCardLike = (card) => {
    console.log(currentUser)
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch(err => console.log(err.message))
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setInitialCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err.message))
  };

  const handleUpdateUser = (updateUser) => {
    api.editProfile(updateUser.name, updateUser.about)
      .then((userInfo) => {
        setCurrentUser(userInfo)
        closeAllPopups();
      })
      .catch(err => console.log(err.message))
  }

  const handleUpdateAvatar = (link) => {
    api.editAvatar(link)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(err => console.log(err.message))
  }

  const handleAddPlaceSubmit = (place, link) => {
    api.insertNewCard(place, link)
      .then((newCard) => {
        setInitialCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err.message))
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        setMessage({ image: succesImg, text: 'Вы успешно зарегистрировались!', alt: 'галочка' })
        navigate('/sign-in');
      })
      .catch(err => {
        setMessage({
          image: errorImg, text: `Что-то пошло не так!
        Попробуйте ещё раз.`, alt: 'крестик'})
        console.log(err)
      })
      .finally(() => setInfoTooltipPopup(true));
  }

  const handleLogin = (email, password) => {

    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          setEmail(email);
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/main', { replace: true });
        }
      })
      .catch(err => {
        setMessage({ image: errorImg, text: `Неправильный пароль или такой пользователь еще не зарегестрирован`, alt: 'крестик' })
        setInfoTooltipPopup(true)
        console.log(err)
      })
  }

  const checkToken = () => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      auth.getContent(jwt)
        .then(res => {
          setEmail(res.email)
          setLoggedIn(true);
          navigate('/main');
        })
        .catch(console.log);
    }
  }

  React.useEffect(() => {
    checkToken();
  }, [])

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    setEmail('');
    navigate('/sign-in', { replace: true })
  }


  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header signOut={handleSignOut} email={email} loggedIn={loggedIn} />
        <Routes>
          <Route path="/main" element={
            <ProtectedRoute loggedIn={loggedIn} element={Main}

              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddNewPlace={handleAddNewPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onConfirmDelete={handleConfirmDelete}
              cards={cards} />

          } />
          <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
          <Route path='/sign-up' element={<Register handleRegister={handleRegister} />} />
          <Route path='/' element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>
        {loggedIn && <Footer />}

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
          message={message}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen.isOpen}
          onClose={closeAllPopups}
          card={isDeletePlacePopupOpen.card}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
