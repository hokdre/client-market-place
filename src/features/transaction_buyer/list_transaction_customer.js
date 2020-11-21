import React, { useRef } from 'react'
import { useReponse } from '../customs_hooks/useResponse'
import Axios from 'axios'
import { URL_GET_TRANSACTION } from '../../api/api'
import ListTransaction from './list_transaction'
import { useDispatch } from 'react-redux'
import { pushTransactions, setTransactions } from './transaction_slice'

const ListTransactionCustomer = props => {
    let dispatch = useDispatch()

    let customerId = localStorage.getItem("userID")
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

    const fetchTransactions = async (last="", status="") => {
        console.log(`fetch customer transaction last : ${last}, status : ${status}`)
        setLoading()
        try {
            let params = `?num=10&customerID=${customerId}`
            if (last) params += `&cursor=${last}`
            if(status) {
                params += `&status=${status}`
            }

            let response = await Axios.get(URL_GET_TRANSACTION(params), {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let transactions = response.data.data
            if(!transactions) transactions = []
            console.log(`returned data`)
            console.log(transactions)

            
            let reset = false
            if (prevStatus.current !== status) {
                reset = true
                prevStatus.current = status
            }

            if (reset){
                dispatch(setTransactions({ transactions : transactions}))
            }else {
                dispatch(pushTransactions({ transactions : transactions}))
            }
            setSuccess()
        }catch(error) {
            console.log(`returned error :`)
            console.log(error)
            setError(error)
        }
    }

    return (
        <ListTransaction
            userType="customer"
            fetch={fetchTransactions}/>
    )
}

export default ListTransactionCustomer