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
import {  URL_ADD_REVIEW_PRODUCTS } from '../../api/api'
import ProductProfile from '../../components/style_components/product_profile'

const STATUS_ORDER_SELESAI = "STATUS_ORDER_SELESAI"
const AddReviewProduct = props => {
    let { order = {}, updateOrder } = props
    let dispatch = useDispatch()

    let [index, setIndex] = useState(0)

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
    const addReviewProduct = async () => {
        console.log(`review merchant : ${order._id}`)
        console.log({
            product_id : order.order_items[index].product._id,
            order_id : order._id,
            rating : rating,
            comment : comment
        })
        try {
            setLoading()
            let response = await Axios.post( URL_ADD_REVIEW_PRODUCTS(), {
                product_id : order.order_items[index].product._id,
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
            let isThisLastItem = index === (order.order_items.length -1)
            if(isThisLastItem){

                let updatedOrder = {
                    ...order,
                    reviewed_merchant : true,
                    reviewed_product : true
                }
    
                dispatch(updateOrderStore({ order : updatedOrder }))
                if(updateOrder) updateOrder(updatedOrder)
            }else{
                setRating(0)
                setComment("")
                setIndex(index+1)
                setIdle()
            }
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
        let merchantReviewd = order.reviewed_merchant === true
        let productNotReviewedYet = order.reviewed_product === false
        if(isOrderFinished && merchantReviewd && productNotReviewedYet) {
           openShow()
        }else {
            closeShow()
        }
    },[order])

    let product = order.order_items ? order.order_items[index].product : {}

    return (
        <PopUpEmpty
            style={{width : "60%"}}
            show={show}
            close={closeShow}
           >
            <div className="add-review-merchant">
                <H2>Review Product</H2>
                <div className="add-review-merchant__merchant-row">
                    <ProductProfile
                        product={product}/>
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
                        event={addReviewProduct}>
                        Save
                    </ButtonBlackSmall>
                </ButtonGroupsRight>
            </div>
        </PopUpEmpty>
    )
}

export default AddReviewProduct