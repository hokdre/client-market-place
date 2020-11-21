import React, { useEffect } from 'react';
import { PopUpConfirm } from '../../components/UI_components/popup';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';
import { URL_CLEAR_CART } from '../../api/api';
import { useDispatch } from 'react-redux';
import { clearCart } from './cart_slice';
import { H3 } from '../../components/UI_components/heading';
import PopUpError from '../../components/style_components/popup_error';

const ConfirmDelAllItems = props => {
    let {show , close, number } = props
    let dispatch = useDispatch()

    let {
        errors,
        httpCode,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()

    useEffect(() =>{
        setIdle()
        return () => setIdle()
    },[])

    const deleteAll = async () => {
        console.log(`delete all items in cart ...`)
        try {
            setLoading()
            let cart_id = localStorage.getItem("cartID")
            await Axios.delete(URL_CLEAR_CART(cart_id),{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch(clearCart())
            setSuccess()
            if(close) close()
            console.log(`returned : success clear item in cart !`)
        }catch(error){
            setError(error)
            console.log(`returned error : `)
            console.log(error)
        } finally {
            close()
        }
    }

    return (
        <>
        <PopUpConfirm
        id="popup-delete-all"
        actionName="hapus"
        item="barang"
        show={show}
        close={close}
        action={deleteAll}
        >
            <H3>Hapus {number} barang?</H3>
        </PopUpConfirm>

        <PopUpError
            show={httpCode && httpCode !== 200 }
            close={setIdle}>
        {
            httpCode === 500 ?
                "Maaf, service sedang tidak tersedia" :
                httpCode === 401 ?
                    "Maaf, status login sedang diperiksa. Mohon coba beberapa saat lagi atau refresh page" :
                        httpCode === 403 ?
                            "Maaf, Anda tidak memiliki hak akses" :
                            httpCode === 400 ?
                                errors["Quantity"] : "Maaf, service sedang tidak tersedia"
        }
        </PopUpError>
        </>
    )
}

export default ConfirmDelAllItems