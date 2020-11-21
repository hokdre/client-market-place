import React, { useState, useEffect, useCallback } from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const InputQuantity = props => {
    let  { value, change } = props 
    let [quantity, setQuantity] = useState(1)
    useEffect(() => {
        if(value) setQuantity(value)
    },[value])

    let minusQuantity = () => {
        if (change) change(quantity-1)
    }
    let addQuantity = () => {
        if (change) change(quantity+1)
    }
    let onChangeQuantity = e => {
        let isNumber = regexContainsNotNumber(e.target.value)
        if (isNumber) { 
            setQuantity(e.target.value)
            debounceChange( Number(e.target.value) )
        }
    }
    let debounceChange = useCallback( AwesomeDebouncePromise( async value => {
        change(value) 
    }, 500),[])

    const regexContainsNotNumber = value => {
        let pattern = /[^0-9]/
        let regex = new RegExp(pattern)
        return !regex.test(value)
    }

    return (
        <div className="quantity">
            <i 
                onClick={minusQuantity}
                className="quantity__minus fas fa-minus-circle"></i>
            <input 
                onChange={onChangeQuantity}
                type="text" 
                value={quantity}/>
            <i 
                onClick={addQuantity}
                className="quantity__plus fas fa-plus-circle"></i>
        </div>
    )

}

export default InputQuantity