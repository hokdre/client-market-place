import React, { useState } from 'react';
import InputCheckBox from './input_checkbox';
import { ButtonBlackSmall } from '../UI_components/button';

const CartCheckAll = props => {
    let { 
        addAll , 
        clearAll,
        openRemove, 
        className="",
        ...rest
     } = props

     let [checked, setChecked ] = useState(false)
     let check = () => {
         setChecked(true)
         addAll()
     }
     let unCheck = () => {
         setChecked(false)
         clearAll()
     }


     return (
        <div 
            {...rest}
            className={`cart-check-all ${className}`}>
            <div className="cart-check-all__check">
                <InputCheckBox
                    checked={checked}
                    check={check}
                    unCheck={unCheck}
                    label="Pilih semua barang"/>
            </div>
            <ButtonBlackSmall event={openRemove}>
                Hapus
            </ButtonBlackSmall>
        </div>
     )
}

export default CartCheckAll;