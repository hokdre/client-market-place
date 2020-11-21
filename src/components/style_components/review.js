import React from 'react'
import CustomerProfile from './customer_profile'
import Stars from './stars'

const Review = props => {
    let { review={} } = props
    return (
        <div className="review">
            <CustomerProfile customer={review.customer}/>
            <div className="review__description">
                <Stars rating={review.rating}/>
                <p className="paragraph">{review.comment}</p>
            </div>
     </div>
    )
}

export default Review