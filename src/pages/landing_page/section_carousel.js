import React from 'react';
import Carousel from '../../components/UI_components/carousel';
const SectionCarousel = props => {
    let items = [
        {
            src : "https://storage.googleapis.com/ecommerce_s2l_assets/promo-1.jpg"
        },
        {
            src : "https://storage.googleapis.com/ecommerce_s2l_assets/promo-2.jpg"
        },
        {
            src : "https://storage.googleapis.com/ecommerce_s2l_assets/promo-3.jpg"
        },
    ]
    return (
        <div className="section-carousel">
            <Carousel items={items} autoPlay={true}/>
        </div>
    )
}

export default SectionCarousel;