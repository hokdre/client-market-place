import React, { useState, useEffect } from 'react';

const FilterPrice = props => {
    let { sMin, sMax, change } = props
    let [min, setMin] = useState("")
    let [max, setMax] = useState("")
    useEffect(() => {
        if(sMin) setMin(sMin)
        if(sMax) setMax(sMax)
    },[])

    const handleChangeMin = e => {
        setMin(e.target.value)
    }
    
    const handleChangeMax = e => {
        setMax(e.target.value)
    }
    
    const changePrice = (e) => {
        let enterKode = 13
        if(e.keyCode === enterKode){
            change({ min : min, max : max })
        }
    }

    return (
        <div className="filter-price">
            <div className="filter-price__box">
                <span className="filter-price__icon">Rp.</span>
                <input 
                    className="filter-price__input"
                    type="text"
                    onKeyDown={changePrice}
                    placeholder="harga minimum" 
                    type="text" value={min} 
                    onChange={handleChangeMin}/>
            </div>
            <div className="filter-price__box">
                <span className="filter-price__icon">Rp.</span>
                <input 
                    className="filter-price__input"
                   onKeyDown={changePrice}
                   placeholder="harga maximum" 
                   type="text" value={max} 
                   onChange={handleChangeMax}/>
            </div>
        </div>
    )
}

export default FilterPrice