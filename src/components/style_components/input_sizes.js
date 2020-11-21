import React from 'react';
import InputTags from './input_tags';

const InputSizes = props => {
    let {sizes , setSizes, error} = props 

    return (
        <InputTags 
            error={error}
            tags={sizes} 
            setTag={setSizes}
            placeholder={"Sizes.."}/>
    )   
}

export default InputSizes;