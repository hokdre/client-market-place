import React, { useState, useEffect } from 'react'
import { PopUpEmpty } from '../../components/UI_components/popup'
import { ButtonBlackSmall, ButtonGroupsRight } from '../../components/UI_components/button'
import { useDispatch } from 'react-redux'
import { updateOrder as updateOrderStore } from './order_slice'
import Axios from 'axios'
import {  URL_FINISH_ORDER } from '../../api/api'
import { useReponse } from '../customs_hooks/useResponse'
import { H2 } from '../../components/UI_components/heading'

const STATUS_ORDER_SELESAI = "STATUS_ORDER_SELESAI"

const FinishOrder = props => {
    let { order = {}, updateOrder } = props

    let dispatch = useDispatch()

    let [showOrderDelivered, setShowDelivered] = useState(false)
    const openDelivered = () => setShowDelivered(true)
    const closeDelivered = () => setShowDelivered(false)
    useEffect(() => {
        let orderNotFinishedYet = order.status_order !== STATUS_ORDER_SELESAI
        if(order.delivered && orderNotFinishedYet ) openDelivered()
    },[order])

    let {
        loading,
        success,
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()
    const finishOrder = async () => {
        console.log(`finish order : ${order._id}`)
        try {
            setLoading()
            let response = await Axios.put(URL_FINISH_ORDER(order._id), {}, {
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
            closeDelivered()
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }

    }

    return (
        <PopUpEmpty
            style = { { width : '30%'}}
            show={showOrderDelivered}
            close={closeDelivered}
            >
                <div className="finish-order">
                    <H2 className="finish-order__title">Paket Telah Sampai!</H2>
                    <p className="finish-order__message"> Hai Paket Kamu Sudah Sampai :), Segera Selesaikan transaksi!</p>
                    <ButtonGroupsRight>
                        <ButtonBlackSmall event={finishOrder}>Finish</ButtonBlackSmall>
                    </ButtonGroupsRight>
                </div>
        </PopUpEmpty>
    )
}

export default FinishOrder