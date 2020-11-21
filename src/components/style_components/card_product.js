import React from 'react';
import { Link } from 'react-router-dom';
import Stars from './stars';

const CardProduct = props => {
    let { 
        image = [], 
        title, 
        city, 
        price, 
        rating, 
        onClick,
        terjual 
    } = props

    return (
        <div onClick={onClick} className="card-product">
            <div className="card-product__header">
                <img src={image[0]} className="card-product__img" alt={image[0]}/>
            </div>
            <div className="card-product__content">
                <p className="card-product__title">{title}</p>
                <Stars rating={rating}/>
                {terjual && ( <p className="card-product__city">{` terjual : ${terjual}`}</p>)}
                <p className="card-product__price">Rp. {price}</p>
                <p className="card-product__city"><i className="fas fa-map-marked-alt"></i> {city}</p>
            </div>
        </div>
    )
}

export default CardProduct;