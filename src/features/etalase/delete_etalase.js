import React, { useEffect } from 'react';
import Axios from 'axios';

import { URL_DELETE_MERCHANT_ETALASE } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';

import { PopUpConfirm, PopUpEmpty } from '../../components/UI_components/popup';
import { useDispatch } from 'react-redux';
import { deleteMerchantEtalase } from '../merchant/merchant_slice';
import PopUpError from '../../components/style_components/PopUpError';

const PopUpDeleteEtalase = props => {
    let {etalase,show,close, merchantId } = props
    let dispatch = useDispatch()
    let {
        error_message,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse() 
        
    useEffect(() => {
        setIdle()
        return () => setIdle()
    },[])

    const submit = async  e => {
        setLoading()
        e.preventDefault()
        try {
            await Axios.delete(URL_DELETE_MERCHANT_ETALASE(merchantId, etalase),{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch(deleteMerchantEtalase({etalase : etalase}))
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
            confilct_message="Etalase sudah ada"
            not_font_message="Etalase tidak ditemukan"
            err_message={error_message}
            />
        <PopUpEmpty
            style={{width : "30%"}}
            show={error_message === "ENTITY VALIDATION"}
            close={setIdle}
            >
            <p className="paragraph form__error">
               Etalase terdapat produk, sehingga tidak dapat dihapus
            </p>
        </PopUpEmpty>
        <PopUpConfirm 
            id={"popup-delete-etalase"} 
            show={show} close={close} 
            item={"etalase"} action={submit}
            actionName={"Delete"}>
                <p className="paragraph">Are you sure delete this etalase ?</p>
        </PopUpConfirm>
        </>
    )
}

export default PopUpDeleteEtalase;