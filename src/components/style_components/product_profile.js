import React from 'react';
import { H3 } from '../UI_components/heading';

const ProductProfile = props => {
    let { product = {} } = props
    return (
        <div className="product-profile">
            <div className="product-profile__photo">
                <img src={product.photos && product.photos[0]} />
            </div>
            <div className="product-profile__data">
                <H3 className="product-profile__name">
                    {product.name}
                </H3>
            </div>
        </div>
    )
}

export default ProductProfile