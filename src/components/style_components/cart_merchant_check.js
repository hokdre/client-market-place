import React from 'react';
import InputCheckBox from './input_checkbox';
import { H3 } from '../UI_components/heading';
import MerchantProfile from './merchant_profile';

const CartMerchantCheck = props => {
    let { 
        merchant = {}, 
        checked = false,
        checkMerchant, 
        unCheckMerchant,
        className = "",
        ...rest 
    } = props

    return (
        <div 
            {...rest}
            className={`cart-merchant-check ${className}`}>
            <div className="cart-merchant-check__check">
                <InputCheckBox
                    checked={checked}
                    check={ () => checkMerchant(merchant._id) }
                    unCheck={ () => unCheckMerchant(merchant._id) }
                    value={merchant._id}
                />
            </div>
            <MerchantProfile
                merchant={merchant}/>
        </div>
    )
}

export default CartMerchantCheck