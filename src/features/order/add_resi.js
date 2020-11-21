import React, { useState, useEffect } from 'react'
import { InputText } from '../../components/UI_components/form'
import { ButtonBlackSmall, ButtonOutlineBlackSmall } from '../../components/UI_components/button'
import { useReponse } from '../customs_hooks/useResponse'
import Axios from 'axios'
import { URL_ADD_RESI_ORDER } from '../../api/api'
import { useDispatch } from 'react-redux'
import { updateOrder as updateOrderStore } from './order_slice'
import { AlertSuccess, AlertError } from '../../components/UI_components/alert'
import AjukanPaketSampai from './AjukanPaketSampai'

const AddResi = props => {
    let {
        order = {},
        updateOrder
    } = props
    let dispatch = useDispatch()

    const [resi, setResi] = useState("")
    const onChangeResi = e => {
        setResi(e.target.value)
    }

    useEffect(() => {
        if(order.resi_number) setResi(order.resi_number)
    },[order])

    let {
        loading,
        success,
        errors,
        setSuccess,
        setError,
        setLoading,
        setIdle
    } = useReponse()
    const addResi = async () => {
        console.log(`add resi number : ${order._id}`)
        try {
            let response = await Axios.put(URL_ADD_RESI_ORDER(order._id), {
                resi_number : resi
            }, {
                headers : {
                    token : localStorage.getItem("token")
                }
            })

            let orderReturned = response.data.data
            console.log(`returned data :`)
            console.log(orderReturned)
            setSuccess()
            updateOrder(orderReturned)
            dispatch(updateOrderStore({ order : orderReturned }))

            setTimeout(() => {
                setIdle()
            }, 3000)
        }catch(error){
            console.log(`returned error : `)
            console.log(error)
            setError(error)
        }
        
    }

    let [showAjukanPaketSampai, setShowAjukanPaketSampai] = useState(false)
    const openShowAjukanPaketSampai = () => setShowAjukanPaketSampai(true)
    const closeShowAjukanPaketSampai = () => setShowAjukanPaketSampai(false)

    return (
        <>
        { success && (<AlertSuccess show={true}>Resi Success uploaded!</AlertSuccess>)}
        <div className="add-resi">
        
            <div className="add-resi__input">
                <InputText
                    placeholder="masukan nomor resi.."
                    onChange={onChangeResi} 
                    value={resi}/>
            </div>
            <div className="add-resi__button"> 
                {
                    !order.delivered && (

                    <ButtonOutlineBlackSmall 
                        event={openShowAjukanPaketSampai}
                        className="margin-right-medium">
                        Ajukan paket sampai
                    </ButtonOutlineBlackSmall>
                    )
                } 
                <ButtonBlackSmall event={addResi}>
                    Save
                </ButtonBlackSmall>
            </div>
        </div>
        <AjukanPaketSampai
            order={order}
            updateOrder={updateOrder}
            show={showAjukanPaketSampai}
            close={closeShowAjukanPaketSampai}
            />
        </>
    )
}

export default AddResi