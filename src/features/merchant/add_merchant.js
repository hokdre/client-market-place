import React, {useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    registerMerchant,
    selectMerchantBasicInfo
} from './merchant_slice';

import Loading from '../../components/UI_components/loading';
import { Row, Col } from '../../layout/row';

import { 
    InputText,
    Form,
    InputTextArea,
    InputSelect
} from '../../components/UI_components/form';
import { ButtonTextBlackMedium, ButtonBlackMedium, ButtonGroupsBetween } from '../../components/UI_components/button';
import { H3 } from '../../components/UI_components/heading';
import { AlertSuccess } from '../../components/UI_components/alert';
import { useHistory } from 'react-router-dom';
import { useReponse } from '../customs_hooks/useResponse';
import { unwrapResult } from '@reduxjs/toolkit';
import Axios from 'axios';
import { URL_REGISTER_MERCHANT } from '../../api/api';
import AutoCompCity from '../../components/logic_components/auto_city';
import AlertError from '../../components/style_components/AlertError';

const FormAddMerchant = () => {
    let dispatch = useDispatch()
    let history = useHistory()
    let {
        error_message,
        errors,
        success, 
        loading,
        setLoading,
        setSuccess,
        setIdle,
        setError
    } = useReponse()

    let formRef = useRef()
    let nameInput = useRef()
    let descriptionInput = useRef()
    let phoneInput = useRef()
    let [city, setCity] = useState({})
    let shippingInput = useRef()
    let streetInput = useRef()
    let houseNumberInput = useRef()

    useEffect(() => {
       setIdle()
    },[])    

    const submit = async (e) => {
        e.preventDefault()
        setIdle()
        setLoading()
        try{ 
           let response = await Axios.post(URL_REGISTER_MERCHANT(),{
                name : nameInput.current.value,
                description : descriptionInput.current.value,
                phone : phoneInput.current.value,
                address : {
                    city : city,
                    street : streetInput.current.value,
                    number : houseNumberInput.current.value,
                },
                shipping_id : shippingInput.current.value
            },{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            let merchant = response.data.data
            dispatch(registerMerchant({ merchant : merchant}))
            reset()
            setSuccess()
            reset()
            setTimeout(() => {
                history.replace(`/merchants/${merchant._id}/update`)
            }, 3000)
        }catch(error){
            setError(error)
        }
    }

    const reset = (e) => {
        if (e) e.preventDefault()
        if(formRef) formRef.current.reset()
    }  
   
   return (
        <>
        {
            loading && (<Loading/>)
        }

            <AlertSuccess close={setIdle} show={success} >Merchant Success Registered</AlertSuccess>
            <AlertError 
                err_message={error_message}
                conflict_message={"Merchant sudah pernah dibuat"}
                not_found_message={""}
                />       
            <Form ref={formRef} className="form-admin">
                <H3 className="form-admin__title">Basic Info</H3>
                <Row>
                    <Col>
                        <InputText 
                            ref={nameInput}
                            name="name"
                            label="Name :"
                            placeholder="name"
                            error={errors["Name"]}/>
                    </Col>
                    <Col>
                        <InputText 
                            ref={phoneInput}
                            name="phone"
                            label="Phone Number :"
                            placeholder="phone number"
                            error={errors["Phone"]}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputTextArea
                            ref={descriptionInput}
                            name="description"
                            label="Description :"
                            placeholder="merchant's description..."
                            error={errors["Description"]}/>
                    </Col>
                </Row>
                <H3 className="form-admin__title">Addresses</H3>
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
                <H3 className="form-admin__title">Shippings :</H3>
                <Row>
                    <Col>
                        <InputSelect
                            options={[
                                {name : "Pos Indonesia", value : "pos"},
                                {name : "JNE", value : "jne"},
                                {name : "TIKI", value : "tiki"}
                            ]}
                            label="Shipping :"
                            ref={shippingInput}
                            name="Shipping :"
                            error={errors["Shippings"]}/>
                    </Col>
                </Row>
                <ButtonGroupsBetween className="margin-vertical-medium">
                    <ButtonTextBlackMedium event={reset}>Clear All</ButtonTextBlackMedium>
                    <ButtonBlackMedium event={submit}>SUBMIT</ButtonBlackMedium>
                </ButtonGroupsBetween>
            </Form>
        </>
    )
} 

export default FormAddMerchant;