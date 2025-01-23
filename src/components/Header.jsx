import React from 'react';
import account from "./img/account.png"
import './css/Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          <div className="header__logo">
            <h1 className="logo">
              <a href="./index.html">TRAVELOKA</a>
            </h1>
          </div>
          <ul className="header__menu">
            <li className="header__link">
              <Link to={'/'} className="header__item">
                Главная
              </Link>
            </li>
            <li className="header__link">
              <Link to={'/product'} className="header__item">
                Достопримечательности
              </Link>
            </li>
            <li className="header__link">
              <Link to={'/contact'} className="header__item">
                Контакты
              </Link>
            </li>
          </ul>
          <a href="#">
            <img src={account} alt="account" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;