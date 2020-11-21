import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { URL_FETCH_REVIEW_MERCHANTS } from '../../api/api'
import { ButtonOutlineBlackSmall } from '../../components/UI_components/button'
import Review from '../../components/style_components/review'

const ListReviewMerchant = props => {
    let { merchantId } = props
    let [reviews, setReviews] = useState([])
    let [canNext, setCanNext] = useState(true)

    useEffect(() => {
        fetchReview()
    }, [merchantId])

    const fetchReview = async (last) => {
        let params = `?merchantID=${merchantId}`
        if(last) params +=  encodeURIComponent(last) 
        try{
            let response = await Axios.get(URL_FETCH_REVIEW_MERCHANTS(params),{
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
            fetchReview(last)
        }
    }


    return (
        <div className="list-review-merchant">
            <ul className="list-review-merchant__items">
                {
                    reviews.map(review => (
                        <li key={review._id}className="list-review-merchant__item">
                          <Review review={review}/>
                        </li>
                    ))
                }
            </ul>

            {
                canNext && (
                    <div className="list-review-merchant__buttons">
                        <ButtonOutlineBlackSmall event={loadMore}>
                            Lihat Lebih Banyak
                        </ButtonOutlineBlackSmall>
                    </div>
                )
            }
        </div>
    )
}

export default ListReviewMerchant