import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { URL_UPDATE_MERCHANT_BASIC_INFO } from '../../api/api';
import { selectMerchantBasicInfo, updateMerchantBasicInfo } from './merchant_slice';
import Axios from 'axios';
import { useReponse } from '../customs_hooks/useResponse';

import { Form, InputTextArea, InputText, FormButtonsRight } from '../../components/UI_components/form';
import { Row, Col } from '../../layout/row';
import { ButtonBlackMedium } from '../../components/UI_components/button';
import { AlertSuccess } from '../../components/UI_components/alert';
import { H3 } from '../../components/UI_components/heading';
import Loading from '../../components/UI_components/loading';

import UpdateAvatarMerchant from './update_avatar';
import AutoCompCity from '../../components/logic_components/auto_city';
import AlertError from '../../components/style_components/AlertError';

const UpdateMerchantBasicInfo = props => {
    let {merchantId } = props
    let dispatch = useDispatch()
    let basicInfo = useSelector(selectMerchantBasicInfo)

    let nameInput = useRef()
    let descriptionInput = useRef()
    let phoneInput = useRef()
    let streetInput = useRef()
    let houseNumberInput = useRef()
    let [city, setCity] = useState({})

    let {
        loading, 
        success, 
        errors,
        error_message,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse()
    
    useEffect(() => {
        setIdle()
        return () => setIdle()
    },[])

    useEffect(() => {
        nameInput.current.value = basicInfo.name
        descriptionInput.current.value = basicInfo.description
        phoneInput.current.value = basicInfo.phone
        setCity(basicInfo.address.city || {})
        streetInput.current.value = basicInfo.address.street
        houseNumberInput.current.value = basicInfo.address.number
    },[basicInfo])

    const handleUpdate = async (e) => {
        if(e) {
            e.preventDefault()
        }
        setIdle()
        setLoading()
        try{
            let data = {
                name : nameInput.current.value,
                description : descriptionInput.current.value,
                phone : phoneInput.current.value,
                address : {
                    city : city,
                    street : streetInput.current.value,
                    number : houseNumberInput.current.value,
                }
            }
            console.log(`updating merchant basic info, with payload :`)
            console.log(data)
            
            await Axios.put(URL_UPDATE_MERCHANT_BASIC_INFO(basicInfo._id),data,{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch(updateMerchantBasicInfo({ basicInfo : data }))
            setSuccess()
            setTimeout(() =>{
                setIdle()
            }, 3000)
            console.log(`returned response :`)
            console.log(data)
        }catch(error){
            console.log(`return error update basic merchant:`)
            console.log(error)
            setError(error)
        }
    }
    
    return (
        <>
        {
            loading && <Loading/>
        }
        <AlertError err_message={error_message}/>
        <AlertSuccess close={setIdle} show={success}>Data is success updated</AlertSuccess>
        <Form method="POST">
            <Row>
                <Col className="margin-right-medium">
                    <UpdateAvatarMerchant avatar={basicInfo.avatar} merchantId={merchantId}/>
                </Col>
                <Col>
                    <InputText 
                        disabled={true}
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
            <FormButtonsRight>
                <ButtonBlackMedium event={handleUpdate} >Update</ButtonBlackMedium>
            </FormButtonsRight>
        </Form>
        </>
    )
}

export default UpdateMerchantBasicInfo;