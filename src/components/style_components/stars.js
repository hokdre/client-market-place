import React from 'react'

const Stars = props => {
    let { rating = 0 } = props

    let star1 = rating >= 1 ? "fas fa-star stars--selected" : ""
    let star2 = rating >= 2 ? "fas fa-star stars--selected" : rating > 1 ? "fas fa-star-half stars--selected" : ""
    let star3 = rating >= 3 ? "fas fa-star stars--selected" : rating > 2 ? "fas fa-star-half stars--selected" : ""
    let star4 = rating >= 4 ? "fas fa-star stars--selected" : rating > 3 ? "fas fa-star-half stars--selected" : ""
    let star5 = rating >= 5 ? "fas fa-star stars--selected" : rating > 4 ? "fas fa-star-half stars--selected" : ""

    return (
        <span className="stars">
            <span className="stars__star">
               <i className={star1}/>
            </span>
            <span className="stars__star">
                <i className={star2}/>
            </span>
            <span className="stars__star">
                <i className={star3}/>
            </span>
            <span className="stars__star">
                <i className={star4}/>
            </span>
            <span className="stars__star">
                <i className={star5}/>
            </span>
        </span>
    )
}

export default Stars