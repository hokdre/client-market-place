import React from 'react';

const ImageResponsive = props => {
    let { src, alt } = props 

    return (
        <img style={{height : '100%', width : '100%'}} src={src} alt={alt}/>
    )
}

export default ImageResponsive