import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { URL_UPDATE_CUSTOMER_BANK_ACCOUNT, URL_UPDATE_MERCHANT_BANK_ACCOUNT } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';


import { Row, Col } from '../../layout/row';
import { InputText, Form, InputSelect } from '../../components/UI_components/form';
import Loading from '../../components/UI_components/loading';
import { AlertSuccess } from '../../components/UI_components/alert';
import Section from '../../components/UI_components/section';
import { ButtonGroupsRight, ButtonOutlineBlackMedium, ButtonBlackMedium } from '../../components/UI_components/button';
import ErrorPage from '../error/error_page';

import { updateCustomerBank } from '../customer/customer_slice';
import { updateMerchantBank } from '../merchant/merchant_slice';

const UpdateBankAccount = (props) => {
    let dispatch = useDispatch()
    let { account, customerId, merchantId, attachCancel, attachSubmit } = props

    let formUpdate = useRef()
    let bankInput = useRef()
    let numberInput = useRef()
   
    useEffect(() => {
        bankInput.current.value = account.bank_code
        numberInput.current.value = account.number
    },[account])

    const [url, setUrl] = useState("")
    const [action, setAction] = useState(null)

    useEffect(() => {
        if(customerId){
            setUrl(URL_UPDATE_CUSTOMER_BANK_ACCOUNT(customerId, account._id)) 
            setAction(updateCustomerBank)
        } 
        else if(merchantId){
            setUrl(URL_UPDATE_MERCHANT_BANK_ACCOUNT(merchantId, account._id))
            setAction(updateMerchantBank)
        } 
    },[customerId, merchantId, account])

    let {
        loading, 
        success, 
        httpCode, 
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 


    const updateAccount = async (e) => {
        e.preventDefault()
        setLoading()
        let data = {
            _id : account._id,
            bank_code : bankInput.current.value,
            number : numberInput.current.value
        }
        try {
            await Axios.put(url, data,
            {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch({...action, payload : {bankAccount : data }})
            setSuccess()
            setTimeout(() => {
                setIdle()
            }, 3000)
        }catch(error){
            setError(error)
        }

        if(attachSubmit) attachSubmit()
    }

    const cancel = (e) => {
        setIdle()
        if(e) e.preventDefault()
        if(attachCancel) attachCancel()
    }

    return (
        <Section>
            {
                (httpCode && httpCode != 400) ? <ErrorPage httpCode={httpCode}/> : ""
            }
            {
                loading && (<Loading/>)
            }

            <AlertSuccess show={success} >
                Bank Account has been updated!
            </AlertSuccess>

            <Form 
                ref={formUpdate} 
                id={"form-update-bank"} 
                method="POST">
                <Row>
                    <Col>
                        <InputSelect
                            label={"Bank :"}
                            selected={account.bank_code}
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
                            error={errors["Number"] ? errors["Number"] : errors["BankAccounts"]}/>
                    </Col>
                </Row>
                <ButtonGroupsRight className="margin-vertical-small">
                    <ButtonOutlineBlackMedium 
                        event={cancel}
                        id={"btn-cancel"}
                        className="margin-right-small">
                        CANCEL
                    </ButtonOutlineBlackMedium>
                    <ButtonBlackMedium
                    id={"btn-update"}
                        event={updateAccount} className="margin-right-small">
                        UPDATE
                    </ButtonBlackMedium>
                </ButtonGroupsRight>
            </Form>
        </Section>
    )
}

export default UpdateBankAccount