import React, { useState } from 'react';


const InputSearch = React.forwardRef((props, ref) => {

    let { search , placeholder , className="", ...rest } = props
    let [keyword, setKeyword] = useState("")

    const handleChange = e => {
        if(e) {
            setKeyword(e.target.value)
        }
    }

    return (
        <div  
            className={`input-search ${className}`}
            {...rest}
        >
            <input 
                className="input-search__input"
                type="text"
                onChange={handleChange} 
                value={keyword}
                ref={ref}  
                placeholder={placeholder}/>
            <i className="input-search__icon fas fa-search fa-2x"  onClick={ () => search(keyword) }></i>
        </div>
    )
})

export default InputSearch;