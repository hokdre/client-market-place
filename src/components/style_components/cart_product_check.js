import React from 'react';
import InputCheckBox from './input_checkbox';
import { H3 } from '../UI_components/heading';
import CartProduct from './cart_product';

const CartProductCheck = props => {
    let {
        merchantId= "",
        product = {}, 
        checked=false,
        checkProduct, 
        unCheckProduct,
        className = "",
        ...rest 
    } = props

    return (
        <div 
            {...rest}
            className={`cart-product-check ${className}`}>   
            <div className="cart-product-check__flex">
                <div className="cart-product-check__check">
                    <InputCheckBox
                        checked={checked}
                        check={() => checkProduct(merchantId, product._id) }
                        unCheck={() => unCheckProduct(merchantId, product._id)}
                        value={product._id}
                    />
                </div>
                <CartProduct product={product}/>
            </div>
        </div>
    )
    
}

export default CartProductCheck;