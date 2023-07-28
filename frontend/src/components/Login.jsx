import React from 'react';
import AuthTemplate from './AuthTemplate';

const Login = ({handleLogin}) => {

    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
      })

      const handleChange = (e) => {
        const {name, value} = e.target;
    
        setFormValue({
          ...formValue,
          [name]: value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = formValue; 
        if (!email && !password) return;
        handleLogin(email, password);
      }

    return (
        <AuthTemplate
            title="Вход"
            name="login"
            buttonText="Войти"
            handleSubmit ={handleSubmit}
        >
            <label className="authTemplate__input-container" htmlFor="regEmail">
            <input
              onChange={handleChange}
              value={formValue.email}
              type="email"
              className="authTemplate__input"
              id="email"
              placeholder="Email"
              name="email"
              required
            />
            <span id="loginEmail-error"></span>
          </label>
          <label className="authTemplate__input-container" htmlFor="regPass">
            <input
              onChange={handleChange}
              value={formValue.password}
              type="password"
              className="authTemplate__input"
              id="password"
              placeholder="Пароль"
              name="password"
              minLength="6"
              maxLength="200"
              required
            />
            <span id="loginPass-error"></span>
          </label>
          <button className="authTemplate__button">
            Войти
          </button>
        </AuthTemplate>
    )
}

export default Login;