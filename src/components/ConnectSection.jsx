import React from 'react';
import './css/ConnectSection.scss';

const Connect = () => {
  return (
    <div className="contact">
        <div className="container">
      <div className="contact__title">
        <h2>Хотите посмотреть достопримечательности рядом с вами?</h2>
      </div>
      <div className="contact__wrapper">
        <div className="contact__text">
          <p>
            Исследуйте достопримечательности, которые находятся совсем рядом, совершайте новые открытия и путешествуйте по миру!
          </p>
        </div>
        <form className="contact__form form">
          <input type="text" className="form__input" placeholder="Ваше имя" autoComplete="off" required/>
          <input
            type="text"
            className="form__input"
            placeholder="Ваш телефон"
            autoComplete="off"
            required
          />
          <p className="form__privat">
            *Мы никому не передаем ваши данные. <br />И не сохраняем ваш номер в базу.
          </p>
          <button
            type="submit"
            className="form__btn"
            onClick={(e) => {
              e.preventDefault();
              window.open('https://maps.app.goo.gl/QrZ25ri4FjGFfEkX7', '_blank'); // Открываем ссылку в новой вкладке
            }}
          >
            Посмотреть район
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Connect;