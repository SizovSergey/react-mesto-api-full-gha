import React from 'react';
import AuthTemplate from './AuthTemplate';


const Register = ({handleRegister}) => {

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
        const { email, password } = formValue; 
        e.preventDefault();
        if (!email && !password) return;
        handleRegister(email, password);
      }

      return (
        <AuthTemplate
          title="Регистрация"
          name="register"
          buttonText="Зарегистрироваться"
          handleSubmit = {handleSubmit}
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
            <span id="RegEmail-error"></span>
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
              minLength="8"
              maxLength="200"
              required
            />
            <span id="RegPass-error"></span>
          </label>
          <button className="authTemplate__button">
            Зарегистрироваться
          </button>
        </AuthTemplate>
      );
      
}

export default Register;