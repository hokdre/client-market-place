import React from 'react'
import { PopUpConfirm } from '../../components/UI_components/popup'
import { useReponse } from '../customs_hooks/useResponse'
import Axios from 'axios'
import { URL_AJUKAN_ORDER_SAMPAI } from '../../api/api'
import { useDispatch } from 'react-redux'
import { updateOrder as updateOrderStore } from './order_slice'

const AjukanPaketSampai = props => {
    let { order={}, show, close, updateOrder } = props
    let dispatch = useDispatch()

    let {
        loading,
        success,
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()
    const ajukanPaketSampai = async () => {
        console.log(`ajukan paket sampe : ${order._id}`)
        try {
            setLoading()
            let response = await Axios.put(URL_AJUKAN_ORDER_SAMPAI(order._id), {}, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let returnedOrder = response.data.data
            console.log(`returned order :`)
            console.log(returnedOrder)
            dispatch(updateOrderStore({ order : returnedOrder }))
            if(updateOrder) updateOrder(returnedOrder)
            setSuccess()
            close()
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }

    }

    return (
        <PopUpConfirm
            show={show}
            actionName="Paket Telah"
            item="Sampai"
            action={ajukanPaketSampai}
            close={close}
            >
            Harap cek terlebih dahulu bahwa paket lah sampai pada website jasa pengiriman yang digunakan. 
            Lanjutkan Proses ?
        </PopUpConfirm>
    )
}

export default AjukanPaketSampai