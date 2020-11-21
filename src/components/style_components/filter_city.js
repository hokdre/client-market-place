import React, { useState, useEffect } from 'react';
import InputCheckBox from './input_checkbox';

const FilterCity = props => {
    let { cities = [] , selectedCities, change } = props
   let [selected, setSelected] = useState({})

   useEffect(() => {
       if(selectedCities){
           let cities = selectedCities.split(",")
           let selected = {}
           cities.forEach(city => selected[city] = true)
           setSelected(selected)
       }else{
           setSelected({})
       }
   },[selectedCities])

    const addToFilter = city => {
        let newSelected = { ...selected }
        newSelected[city] = true
        change(newSelected)
    }

    const removeFromFilter = city => {
        let newSelected = { ...selected }
        if(newSelected[city]) delete newSelected[city]
        change(newSelected)
    }

    return (
        <div className="filter-city">
            { cities.map(city => (
                <InputCheckBox
                    key={city.key}
                    val={city.key}
                    label="city"
                    checked={selected[city.key] ? true : false}
                    check={addToFilter}
                    unCheck={removeFromFilter}
                    />
            )) }
        </div>
    )

}

export default FilterCity