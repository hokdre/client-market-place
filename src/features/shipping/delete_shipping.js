import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { URL_DELETE_MERCHANT_SHIPPING } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';

import { PopUpConfirm } from '../../components/UI_components/popup';
import { useDispatch } from 'react-redux';
import ErrorPage from '../error/error_page';

import { deleteMerchantShipping } from '../merchant/merchant_slice';

const PopUpDeleteShipping = props => {
    let {shipping,show,close, merchantId } = props

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
        try {
            await Axios.delete(URL_DELETE_MERCHANT_SHIPPING(merchantId, shipping._id),{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch( deleteMerchantShipping({shipping : shipping}))
            setSuccess()
            close()
        }catch(error){
            setError(error)
        }
    }

    return (
        <>
        <PopUpConfirm 
            id={"popup-delete-address"} 
            show={show} close={close} 
            item={"address"} action={submit}
            actionName={"Delete"}>
                Are you sure delete this shipping?
        </PopUpConfirm>
        </>
    )
}

export default PopUpDeleteShipping;