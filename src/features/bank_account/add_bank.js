import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

import {  URL_ADD_CUSTOMER_BANK_ACCOUNT, URL_ADD_MERCHANT_BANK_ACCOUNT } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';

import { 
    InputText, Form, InputSelect,
} from '../../components/UI_components/form';
import { ButtonGroupsBetween, ButtonTextBlackMedium, ButtonBlackMedium } from '../../components/UI_components/button';
import { useDispatch } from 'react-redux';
import { Row, Col } from '../../layout/row';

import ErrorPage from '../error/error_page';
import Loading from '../../components/UI_components/loading';

import { addCustomerBank } from '../customer/customer_slice';
import { addMerchantBank } from '../merchant/merchant_slice';
import AlertError from '../../components/style_components/AlertError';

const  AddBankAccount = (props)=> {
    const { customerId, merchantId } = props

    let dispatch = useDispatch()
    let {
        loading, 
        error_message,
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 

    const [url, setUrl] = useState("")
    const [action, setAction] = useState(null)

    useEffect(()=>{
        if(customerId){
            setUrl(URL_ADD_CUSTOMER_BANK_ACCOUNT(customerId))
            setAction(addCustomerBank)
        }else if(merchantId){
            setUrl(URL_ADD_MERCHANT_BANK_ACCOUNT(merchantId))
            setAction(addMerchantBank)
        }
    },[customerId,merchantId])

    let formAdd = useRef()
    let bankInput = useRef()
    let numberInput = useRef()

    const reset = (e) => {
       if(e) e.preventDefault()
       if(formAdd) formAdd.current.reset()
    }

    const submit = async (e) => {
        if(e) {
            console.log(`aaa`)
            e.preventDefault()
            e.stopPropagation()
        } 
        console.log(`add bank :`)
        console.log({
            bank_code : bankInput.current.value,
            number : numberInput.current.value
        })
        setIdle()
        setLoading()
        try{
            let response = await Axios.post(url,{
                bank_code : bankInput.current.value,
                number : numberInput.current.value
            },{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let responseBanks = response.data.data.bank_accounts
            let newBank = responseBanks[responseBanks.length-1]
            reset()
            dispatch({...action, payload : { bankAccount : newBank }})
            setSuccess()
            console.log(`returned value :`)
            console.log(response.data.data)
        }catch(error){
            console.log(`returend error :`)
            console.log(error)
            setError(error)
        }
    }
    
    return (
        <>
        <AlertError err_message={error_message}/>
        <Form id={"form-add-address"} ref={formAdd} method="POST">
            {
                loading && <Loading/>
            }
            <Row>
                <Col>
                    <InputSelect
                        label={"Bank :"}
                        ref={bankInput}
                        name={"bankCode"}
                        error={errors["BankCode"]}
                        options={[
                            {value : "014" , name : "BCA"},
                            {value : "008" , name : "MANDIRI"},
                            {value : "009" , name : "BNI"},
                            {value : "002" , name : "BRI"}
                        ]}/>
                </Col>
                <Col>
                    <InputText 
                        ref={numberInput}
                        name="accountNumber"
                        label="Account Number :"
                        placeholder="Account Number"
                        error={errors["Number"]}/>
                </Col>
            </Row>
            <ButtonGroupsBetween>
                <ButtonTextBlackMedium id={"btn-reset-address"} event={reset} >RESET</ButtonTextBlackMedium>
                <ButtonBlackMedium id={"btn-submit-address"} event={submit}>
                    SUBMIT
                </ButtonBlackMedium>
            </ButtonGroupsBetween>
        </Form>
        </>
    )
}

export default AddBankAccount;