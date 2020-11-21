import React, { useRef } from 'react'
import { useReponse } from '../customs_hooks/useResponse'
import Axios from 'axios'
import { URL_GET_ORDER_MERCHANT } from '../../api/api'
import ListOrder from './list_order'
import { useDispatch } from 'react-redux'
import { pushOrders, setOrders } from './order_slice'

const Button = props => {
    let {onClick } = props
    return (<p onClick={ () => console.log(onClick())}>Button </p>)
}

const ListOrderMerchant = props => {
    let dispatch = useDispatch()

    let merchantId = localStorage.getItem("merchantID")
    let prevStatus = useRef()

    let {
        loading,
        success,
        errors,
        httpCode,
        setLoading,
        setSuccess,
        setError
    } = useReponse()

    const fetchOrders = async (last="", status="") => {
        console.log(`fetch customer order last : ${last}, status : ${status}`)
        setLoading()
        try {
            let params = `?num=10`
            if (last) params += `&cursor=${last}`
            if(status) {
                params += `&status=${status}`
            }

            let response = await Axios.get(URL_GET_ORDER_MERCHANT(merchantId, params), {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let orders = response.data.data
            if(!orders) orders = []
            console.log(`returned data`)
            console.log(orders)

            
            let reset = false
            if (prevStatus.current !== status) {
                reset = true
                prevStatus.current = status
            }

            if (reset){
                dispatch(setOrders({ orders : orders}))
            }else {
                dispatch(pushOrders({ orders : orders}))
            }
            setSuccess()
        }catch(error) {
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }
    }

    return (
        <ListOrder
            userType="merchant"
            fetch={fetchOrders}/>
    )
}

export default ListOrderMerchant