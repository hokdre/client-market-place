import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { URL_FETCH_REVIEW_PRODUCTS } from '../../api/api'
import { ButtonOutlineBlackSmall } from '../../components/UI_components/button'
import Review from '../../components/style_components/review'

const ListReviewProduct = props => {
    let { productId } = props
    let [reviews, setReviews] = useState([])
    let [canNext, setCanNext] = useState(true)

    useEffect(() => {
        setReviews([])
        fetchReview(productId)
    }, [productId])

    const fetchReview = async (productId, last) => {
        let params = `?merchantID=${productId}`
        if(last) params +=  encodeURIComponent(last) 
        try{
            let response = await Axios.get(URL_FETCH_REVIEW_PRODUCTS(params),{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            if(response.data.data){
                setReviews([...reviews,...response.data.data])
            }else {
                setCanNext(false)
            }
        }catch(err){
            setCanNext(false)
        }
    }

    const loadMore = () => {
        if(canNext) {
            let last = reviews[reviews.length -1 ].created_at
            fetchReview(productId, last)
        }
    }


    return (
        <div className="list-review-product">
            <ul className="list-review-product__items">
                {
                    reviews.map(review => (
                        <li key={review._id}className="list-review-product__item">
                          <Review review={review}/>
                        </li>
                    ))
                }
            </ul>

            {
                canNext && (
                    <div className="list-review-product__buttons">
                        <ButtonOutlineBlackSmall event={loadMore}>
                            Lihat Lebih Banyak
                        </ButtonOutlineBlackSmall>
                    </div>
                )
            }
        </div>
    )
}

export default ListReviewProduct