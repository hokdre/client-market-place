import React from 'react';
import { useSelector } from 'react-redux';
import { selectItems } from '../../features/cart/cart_slice';
import { H3 } from '../UI_components/heading';
import { ButtonBlackSmall, ButtonOutlineBlackSmall } from '../UI_components/button';
import { useHistory } from 'react-router-dom';

const DropdownCart = props => {
    let { className } = props
    let items = useSelector(selectItems)
    let history = useHistory()

    const navigateListItems = () => {
        history.push("/carts")
    }

    let quantity = 0
    if (items) {
        items.forEach((item) => {
            quantity += item.quantity
        })
    }

    return (
        <div className="dropdown-cart">
            <i className={`dropdown-cart__button fas fa-shopping-cart ${className && className}`}>{quantity}</i>
            <div className="dropdown-cart__data">
                <div className="dropdown-cart__header">
                    <span className="dropdown-cart__header-title">
                        Keranjang ({quantity})
                    </span>
                    <ButtonBlackSmall event={navigateListItems}>
                        Lihat Sekarang
                    </ButtonBlackSmall>
                </div>

                { items.length === 0 ? 
                    (
                    <div className="dropdown-cart__empty">
                        <div className="dropdown-cart__empty-data">
                            <div className="dropdown-cart__empty-icon">
                                <i className="fas fa-tshirt"></i>
                            </div>
                            <p className="dropdown-cart__empty-message">
                                Belum ada product di keranjang mu, ayo lihat produk menarik yang ada!
                            </p>
                        </div>
                    </div>
                    ) 
                        : 
                    (
                    <ul className="dropdown-cart__items">
                        {
                            items.map(item => (
                            <li key={item.product._id} 
                                onClick={navigateListItems}
                                className="dropdown-cart__item">
                                <div className="dropdown-cart__product">
                                    <div className="dropdown-cart__photo-col">
                                        <img src={item.product && item.product.photos[0]}/>
                                    </div>
                                    <div className="dropdown-cart__data-col">
                                            <H3 className="dropdown-cart__product-name">{item.product && item.product.name}</H3>
                                            <p className="dropdown-cart__product-quantity">{item.quantity} barang ({item.product && item.product.weight} gram)</p>
                                    </div>
                                    <div className="dropdown-cart__price-col">
                                        <span className="dropdown-cart__product-price">
                                            Rp. {item.product && item.product.price}
                                        </span>
                                    </div>
                                </div>
                            </li>  
                            ))
                        }
                    </ul>
                    ) 
                }
            </div>
        </div>
    )
}

export default DropdownCart