import React from 'react'
import { H3 } from '../UI_components/heading'

const CartProduct = props => {
    let { product } = props
    return (
        <div className="cart-product">
            <div className="cart-product__photo">
                <img src={product.photos && product.photos[0]}/>
            </div>
            <div className="cart-product__data">
                <H3 className="cart-product__name">
                    {product.name}
                </H3>
                <p className="cart-product__price">
                    Rp. {product.price}
                </p>
            </div>
        </div>
    )
}

export default CartProduct