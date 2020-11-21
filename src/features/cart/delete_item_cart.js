import React from 'react';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';

import { URL_DELETE_ITEM_CART } from '../../api/api';
import { useDispatch } from 'react-redux';
import { PopUpConfirm } from '../../components/UI_components/popup';
import PopUpError from '../../components/style_components/popup_error';
import { deleteItem as storeDeleteItem } from './cart_slice';

const DeleteItemCart = props => {
    let { show , close, item  = {} } = props
    let dispatch = useDispatch()

    let {
        loading,
        errors,
        httpCode,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()

    const deleteItem = async () => {
        console.log(`delete item in cart...`)
        console.log(item)
        try{
            setLoading()
            let cartId = localStorage.getItem("cartID")
            let response = await Axios.delete(URL_DELETE_ITEM_CART(cartId, item.product._id), {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch(storeDeleteItem({ productId : item.product._id }))
            setSuccess()
            console.log(`returned respose :`)
            console.log(response.data.data)
        }catch(error){
            setError(error)
            console.log(`returned error :`)
            console.log(error)
        }finally{
            close()
        }
    }

    return (
        <>
        <PopUpConfirm
            show={show}
            close={close}
            action={deleteItem}
            actionName={"Delete"}
            item={"Produk Ini"}>
                { loading && (<p>Loading...</p>)}
                Are you sure delete this product ?
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

export default DeleteItemCart