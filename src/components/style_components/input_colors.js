import React from 'react';
import InputTags from './input_tags';

const InputColors = props => {
    let {colors , setColors, error} = props 

    return (
        <>
        <InputTags 
            error={error}
            tags={colors} 
            setTag={setColors}
            placeholder={"Colors.."}/>
        </>
    )   
}

export default InputColors;