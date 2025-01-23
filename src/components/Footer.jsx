import React from 'react';
import facebook from "./img/twitter.svg";
import instagram from "./img/instagram.svg";
import twitter from "./img/facebook.svg";
import './css/Header.scss';

const Header = () => {
  return (
    <footer className="footer none1">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__logo">
            <a href="#">
              <h2 className="header__logo__text">Traveloka</h2>
            </a>
          </div>
          <div className="footer__nav">
            <nav>
              <ul className="footer__nav-list">
                <li><a href="#">О комплексе</a></li>
                <li><a href="#">Район</a></li>
                <li><a href="#">Контакты</a></li>
              </ul>
            </nav>
          </div>
          <div className="footer__nav">
            <nav>
              <ul className="footer__nav-list">
                <li><a href="#">Сервисные услуги</a></li>
                <li><a href="#">Экологическая устойчивость</a></li>
                <li><a href="#">Инвестиционные возможности</a></li>
                <li><a href="#">Программа лояльности</a></li>
              </ul>
            </nav>
          </div>
          <div className="footer__address">
            <ul className="footer__nav-list">
              <li>Адрес: Наб. реки Фонтанки 10-15</li>
              <li>Телефон: <a href="tel:+78121287967">8 (982) 923-65-07</a></li>
              <li>E-mail: <a className="link-bold" href="mailto:vip@lofthouse.ru">vip@traveloka.ru</a></li>
            </ul>
            <ul className="footer__socials">
              <li>
                <a href="#">
                    <img src={facebook} alt="facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                    <img src={instagram} alt="instagram" />
                </a>
              </li>
              <li>
                <a href="#">
                    <img src={twitter} alt="Twitter" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Header;