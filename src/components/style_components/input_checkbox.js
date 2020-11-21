import React, { useState, useEffect } from 'react';

const InputCheckBox = props => {
    let { 
        check,
        unCheck, 
        val, 
        label = "",
        checked, 
        className="", 
        style={},
        ...rest 
    } = props

    let [value, setValue ] = useState("")
    useEffect(() => {
        if(val !== undefined) setValue(val)
    }, [val])

    const onChange = () => {
        if(checked) unCheck(value)
        else check(value)
    }

    return (
        <label 
            key={value} 
            className={`input-checkbox ${className}`}
            {...style}
        > 
           {value ? value : '\u00A0' }
            <input 
                className="input-checkbox__input"
                onChange={onChange}
                readOnly={true}
                id={value}
                type="checkbox"  
                value={value}
                checked={checked}
                {...rest}/>
            <span className="input-checkbox__mark"></span>
        </label>
    )
}

export default InputCheckBox;