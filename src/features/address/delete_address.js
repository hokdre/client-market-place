import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { URL_DELETE_ADMIN_ADDRESS, URL_DELETE_CUSTOMER_ADDRESS, URL_DELETE_MERCHANT_ADDRESS } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';

import { PopUpConfirm, PopUpEmpty } from '../../components/UI_components/popup';
import { useDispatch } from 'react-redux';
import ErrorPage from '../error/error_page';

import { deleteAdminAddress } from '../admin/admin_slice';
import { deleteCustomerAddress } from '../customer/customer_slice';
import PopUpError from '../../components/style_components/PopUpError';

const PopUpDeleteAddress = props => {
    let {address,show,close, customerId, merchantId, adminId } = props

    let dispatch = useDispatch()
    const [url, setUrl] = useState("")
    const [action, setAction] = useState(null)
    let {
        error_message,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 


    useEffect(() => {
        if(customerId){
            setUrl(URL_DELETE_CUSTOMER_ADDRESS(customerId, address._id))
            setAction(deleteCustomerAddress)
        }
        else if(merchantId){
            setUrl(URL_DELETE_MERCHANT_ADDRESS(merchantId, address._id))
        }else if(adminId){
            setUrl(URL_DELETE_ADMIN_ADDRESS(adminId, address._id))
            setAction(deleteAdminAddress)
        }
    }, [customerId, merchantId, adminId, address])

    const submit = async  e => {
        setLoading()
        setIdle()
        e.preventDefault()
        try {
            await Axios.delete(url,{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch({...action, payload : {address : address}})
            setSuccess()
            close()
        }catch(error){
            close()
            setError(error)
        }
    }

    return (
        <>
        <PopUpError 
            confilct_message="Address sudah ada"
            not_font_message="Address tidak ditemukan"
            err_message={error_message}
            />
        <PopUpEmpty
            style={{width : "30%"}}
            show={error_message === "ENTITY VALIDATION"}
            close={setIdle}
            >
            <p className="paragraph form__error">
                Address minimal harus ada 1
            </p>
        </PopUpEmpty>

        <PopUpConfirm 
            id={"popup-delete-address"} 
            show={show} close={close} 
            item={"address"} action={submit}
            actionName={"Delete"}>
                <p className="paragraph">
                    Anda yakin ingin menghapus alamat ini ?
                </p>
        </PopUpConfirm>
        </>
    )
}

export default PopUpDeleteAddress;