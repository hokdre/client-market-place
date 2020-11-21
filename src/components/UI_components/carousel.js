import React, { useState, useEffect } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slider from './slider';
import ImageResponsive from './image';

const Carousel = props => {

    const { items } = props 
    return (
        <Slider width={1} autoPlay={true} indicator={true}>
            {items.map((item,index) => (
                <div key={index}>
                    <ImageResponsive src={item.src} alt={index}/>
                </div>
            ))}
        </Slider>
    )
}

export default Carousel;