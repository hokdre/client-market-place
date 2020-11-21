import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

import { URL_ADD_ADMIN_ADDRESS, URL_ADD_CUSTOMER_ADDRESS, URL_ADD_MERCHANT_ADDRESS } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';

import { 
    InputText, Form,
} from '../../components/UI_components/form';
import { ButtonGroupsBetween, ButtonTextBlackMedium, ButtonBlackMedium } from '../../components/UI_components/button';
import { useDispatch } from 'react-redux';
import { Row, Col } from '../../layout/row';

import ErrorPage from '../error/error_page';
import Loading from '../../components/UI_components/loading';

import { addAdminAddress } from '../admin/admin_slice';
import { addCustomerAddress } from '../customer/customer_slice';
import AutoCompCity from '../../components/logic_components/auto_city';
import AlertError from '../../components/style_components/AlertError';

const  AddAddress = (props)=> {
    const {
        attachCancel,
        attachSubmit,
        adminId, 
        customerId, 
        merchantId 
    } = props

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
        if(adminId){
            setUrl(URL_ADD_ADMIN_ADDRESS(adminId))
            setAction(addAdminAddress)
        }else if(customerId){
            setUrl(URL_ADD_CUSTOMER_ADDRESS(customerId))
            setAction(addCustomerAddress)
        }else if(merchantId){
            setUrl(URL_ADD_MERCHANT_ADDRESS(merchantId))
        }
    },[adminId, customerId,merchantId])

    let formAdd = useRef()
    let streetInput = useRef()
    let houseNumberInput = useRef()
    let [city, setCity] = useState({})

    const reset = (e) => {
       if(e) e.preventDefault()
       if(formAdd) formAdd.current.reset()
       if(attachCancel) attachCancel()
    }

    const submit = async (e) => {
        if(e) {
            e.preventDefault()
        }
        setIdle()
        setLoading()
        try{
            let response = await Axios.post(url,{
                city : city,
                street : streetInput.current.value,
                number : houseNumberInput.current.value
            },{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let responseAddresses = response.data.data.addresses
            let newAddress = responseAddresses[responseAddresses.length-1]
            reset()
            dispatch({...action, payload : { address : newAddress }})
            setSuccess()
            setTimeout(() => {
                setIdle() 
            }, 3000)

            if (attachSubmit) attachSubmit(newAddress)
        }catch(error){
            setError(error)
        }
    }

    return (
        <>
        <AlertError 
            err_message={error_message}/>
        {
            loading && <Loading/>
        }
        <Form id={"form-add-address"} ref={formAdd} method="POST">
            <AutoCompCity
                errors={errors}
                selectedCity={city}
                setCity={setCity}/>
            <Row>
                <Col>
                    <InputText 
                        ref={streetInput}
                        name="street"
                        label="Street :"
                        placeholder="street"
                        error={errors["Street"]}/>
                </Col>
                <Col>
                    <InputText 
                        ref={houseNumberInput}
                        name="houseNumber"
                        label="House Number :"
                        placeholder="house number"
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

export default AddAddress;