import React from 'react';
import { Link } from 'react-router-dom';

const AuthTemplate = ({ title, name, children, handleSubmit }) => {
    return (
        <div className='authTemplate'>
            <div className='authTemplate__container'>
                <h2 className='authTemplate__title'>{title}</h2>
                <form onSubmit={handleSubmit} className='authTemplate__form'>
                    {children}
                    {name === 'register' &&
                    <p className='authTemplate__text'>Уже зарегистрированы? <Link to="/sign-in" className="authTemplate__link">Войти</Link></p>
                }
                </form>
                
            </div>
        </div>
    );
}

export default AuthTemplate;