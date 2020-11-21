import React, { useState } from 'react';
import Axios from 'axios';

import { URL_DELETE_PRODUCT } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';

import { PopUpConfirm } from '../../components/UI_components/popup';
import { useDispatch } from 'react-redux';
import ErrorPage from '../error/error_page';

import { deleteMerchantProduct } from '../merchant/merchant_slice'

const PopUpDeleteProduct = props => {
    let {product,show,close } = props

    let dispatch = useDispatch()
    let {
        loading, 
        success, 
        httpCode, 
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 

    const [showErr, setShowErr] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const submit = async  e => {
        setLoading()
        e.preventDefault()
        console.log(`delete product with _id : ${product._id}`)
        try {
            let response = await Axios.delete(URL_DELETE_PRODUCT(product._id),{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            console.log(`response delete :`)
            console.log(response.data.data)
            dispatch(deleteMerchantProduct({ etalase : product.etalase, product : product }))
            setSuccess()
            close()
        }catch(error){
            console.log(error)
            setError(error)
        }
    }

    return (
        <>
        <PopUpConfirm 
            id={"popup-delete-product"} 
            show={show} close={close} 
            item={"product"} action={submit}
            actionName={"Delete"}>
                Are you sure delete this product ?
        </PopUpConfirm>
        </>
    )
}

export default PopUpDeleteProduct;