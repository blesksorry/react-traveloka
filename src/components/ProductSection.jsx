import React from 'react';
import bg1 from './img/bg1.webp';
import bg2 from './img/bg2.jpg';
import bg3 from './img/bg3.jpg';
import './css/ProductSection.scss';
import { Link } from 'react-router-dom';

const ProductSection = () => {
    return (
        <div className="product__container">
            <h2 className="product__title">Выбери страну</h2>

            <Link to={'/product'} className="product__item">
                <div className="product__header">Китай</div>
                <div className="cursor-bg" style={{ backgroundImage: `url(${bg1})` }}></div>
            </Link>
            <Link to={'/product'} className="product__item">
                <div className="product__header">Россия</div>
                <div className="cursor-bg" style={{ backgroundImage: `url(${bg2})` }}></div>
            </Link>
            <Link to={'/product'} className="product__item">
                <div className="product__header">Норвегия</div>
                <div className="cursor-bg" style={{ backgroundImage: `url(${bg3})` }}></div>
            </Link>
        </div>
    );
};

export default ProductSection;