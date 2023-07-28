import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg'

const Header = ({ signOut, email, loggedIn }) => {

    const currentPath = window.location.pathname;

    return (
        <header className="header">
            <img src={logo} alt="логотип белый" className="header__logo" />
           
                {loggedIn &&
                   <div className='header__user-info'>
                   <span>{email}</span>
                   <button className='header__button-signout' onClick={signOut}>Выйти</button>
                 </div>
                }
                {currentPath === '/sign-in' &&
                    <div className='auth-info'>
                        <Link to="/sign-up" className="header__link">Регистрация</Link>
                    </div>
                }
                {currentPath === '/sign-up' &&
                    <div className='auth-info'>
                        <Link to="/sign-in" className="header__link">Войти</Link>
                    </div>
                }        
        </header>
    );
}

export default Header;