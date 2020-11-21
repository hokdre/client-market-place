import React, { useState, useEffect } from 'react'
import { useReponse } from '../customs_hooks/useResponse'
import { InputTextArea } from '../../components/UI_components/form'
import { ButtonGroupsRight, ButtonOutlineBlackSmall, ButtonBlackSmall } from '../../components/UI_components/button'
import { PopUpEmpty } from '../../components/UI_components/popup'
import MerchantProfile from '../../components/style_components/merchant_profile'
import { H2 } from '../../components/UI_components/heading'
import { useDispatch } from 'react-redux'
import { updateOrder as updateOrderStore } from '../order/order_slice'
import Axios from 'axios'
import { URL_ADD_REVIEW_MERCHANTS } from '../../api/api'

const STATUS_ORDER_SELESAI = "STATUS_ORDER_SELESAI"
const AddReviewMerchant = props => {
    let { order = {}, updateOrder } = props
    let dispatch = useDispatch()

    let [rating, setRating] = useState(0)

    let [comment, setComment] = useState("")
    const onChangeComment = (e) => {
        setComment(e.target.value)
    }


    let {
        loading,
        success,
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()
    const addReviewMerchant = async () => {
        console.log(`review merchant : ${order._id}`)
        try {
            setLoading()
            let response = await Axios.post( URL_ADD_REVIEW_MERCHANTS(), {
                merchant_id : order.merchant._id,
                order_id : order._id,
                rating : rating,
                comment : comment
            }, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let returnedReview = response.data.data
            console.log(`returned review :`)
            console.log(returnedReview)

            let updatedOrder = {
                ...order,
                reviewed_merchant : true
            }
            dispatch(updateOrderStore({ order : updatedOrder }))
            if(updateOrder) updateOrder(updatedOrder)
            setSuccess()
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }
    }

    let [show, setShow ] = useState(false)
    let openShow = () => setShow(true)
    let closeShow =() =>{
        setShow(false)
        setRating(0)
        setComment("")
    } 
    useEffect(() => {
        let isOrderFinished = order.status_order === STATUS_ORDER_SELESAI
        let merchantNotReviewedYet = order.reviewed_merchant === false
        if(isOrderFinished && merchantNotReviewedYet) {
           openShow()
        }else {
            closeShow()
        }
    },[order])

    return (
        <PopUpEmpty
            style={{width : "60%"}}
            show={show}
            close={closeShow}
           >
            <div className="add-review-merchant">
                <H2>Review Merchant</H2>
                <div className="add-review-merchant__merchant-row">
                    <MerchantProfile
                        merchant={order.merchant}/>
                </div>
                <div className="add-review-merchant__stars-row">
                    <div className="add-review-merchant__stars">
                        <i 
                        onClick={() => setRating(1)} className={`fas fa-star ${rating >= 1 ? "add-review-merchant__stars--selected" : ""}`}>
                        </i>
                        <i 
                        onClick={() => setRating(2)} className={`fas fa-star ${rating >= 2 ? "add-review-merchant__stars--selected" : ""}`}>
                        </i>
                        <i 
                        onClick={() => setRating(3)} className={`fas fa-star ${rating >= 3 ? "add-review-merchant__stars--selected" : ""}`}>
                        </i>
                        <i 
                        onClick={() => setRating(4)} className={`fas fa-star ${rating >= 4 ? "add-review-merchant__stars--selected" : ""}`}>
                        </i>
                        <i 
                        onClick={() => setRating(5)} className={`fas fa-star ${rating >= 5 ? "add-review-merchant__stars--selected" : ""}`}>
                        </i>
                    </div>
                    <br/>
                    <span className="add-review-merchant__stars-error">{errors["Rating"]}</span>
                    </div>
                <div className="add-review-merchant__comment">
                    <InputTextArea
                    placeholder="review..."
                    value={comment}
                    onChange={onChangeComment}
                    error={errors["Comment"]}
                    />
                </div>
                <ButtonGroupsRight>
                    <ButtonOutlineBlackSmall 
                    event={closeShow}
                    className="margin-right-medium">
                        cancel
                    </ButtonOutlineBlackSmall>
                    <ButtonBlackSmall
                        event={addReviewMerchant}>
                        Save
                    </ButtonBlackSmall>
                </ButtonGroupsRight>
            </div>
        </PopUpEmpty>
    )
}

export default AddReviewMerchant