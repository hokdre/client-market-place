import React, { useState } from 'react'

import { ButtonRedSmall } from '../../components/UI_components/button'
import { PopUpConfirm } from '../../components/UI_components/popup'
import Axios from 'axios'
import { useReponse } from '../customs_hooks/useResponse'
import { URL_REJECT_ORDER } from '../../api/api'
import { useDispatch } from 'react-redux'
import { updateOrder as updateOrderStore } from './order_slice'

const RejectOrder = props => {
    let { order = {}, updateOrder  } = props
    let dispatch = useDispatch()

    let [showConfirm, setShowConfirm ] = useState(false)
    const openConfirm = () => setShowConfirm(true)
    const closeConfirm = () => setShowConfirm(false)

    let {
        loading,
        success,
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
    } = useReponse()
    const rejectOrder = async () => {
        console.log(`reject order : ${order._id}`)
        setLoading()
        try {
            let response = await Axios.put(URL_REJECT_ORDER(order._id),{}, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })

            let returnedOrder = response.data.data
            if(returnedOrder){
                dispatch(updateOrderStore({order : returnedOrder }))
                updateOrder(returnedOrder)
            } 
            console.log(`returned data : `)
            console.log(returnedOrder)
            closeConfirm()
        }catch(error){
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }
    }

    return (
        <div className="reject-order">
            <ButtonRedSmall event={openConfirm} className="margin-bottom-small">
                Tolak
            </ButtonRedSmall>
           
            <PopUpConfirm
                actionName="Reject"
                item="Order"
                action={rejectOrder}
                show={showConfirm}
                close={closeConfirm}>
                Kamu yakin menolak order ini ?
            </PopUpConfirm>
        </div>
    )
}

export default RejectOrder