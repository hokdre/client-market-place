import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { URL_UPDATE_ADMIN_ADDRESS, URL_UPDATE_CUSTOMER_ADDRESS, URL_UPDATE_MERCHANT_ADDRESS } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';


import { Row, Col } from '../../layout/row';
import { InputText, Form } from '../../components/UI_components/form';
import Loading from '../../components/UI_components/loading';
import { AlertSuccess } from '../../components/UI_components/alert';
import { ButtonGroupsRight, ButtonOutlineBlackMedium, ButtonBlackMedium } from '../../components/UI_components/button';
import ErrorPage from '../error/error_page';

import { updateAdminAddress } from '../admin/admin_slice'
import { updateCustomerAddress } from '../customer/customer_slice';
import { updateMerchantAddress } from '../merchant/merchant_slice';
import AutoCompCity from '../../components/logic_components/auto_city';
import AlertError from '../../components/style_components/AlertError';

const UpdateAddress = (props) => {
    let dispatch = useDispatch()
    let { 
        address, 
        customerId, 
        adminId, 
        merchantId, 
        attachCancel, 
        attachSubmit 
    } = props

    let {
        loading, 
        success, 
        error_message, 
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 

    let formUpdate = useRef()
    let streetInput = useRef()
    let houseNumberInput = useRef()
    let [city, setCity] = useState({})
    let cityInput = useRef()
    let postalCodeInput = useRef()
    useEffect(() => {
        setIdle()
        setCity(address.city || {})
        streetInput.current.value = address.street
        houseNumberInput.current.value = address.number
    },[address])

    if(!loading && !success && !error_message){
        if(cityInput.current && address.city != cityInput.current.value) cityInput.current.value = address.city
        if(streetInput.current && address.street != streetInput.current.value)  streetInput.current.value = address.street
        if(houseNumberInput.current && address.number != houseNumberInput.current.value)  houseNumberInput.current.value = address.number
        if(postalCodeInput.current && address.postal_code != postalCodeInput.current.value)  postalCodeInput.current.value = address.postal_code
    }

    const [url, setUrl] = useState("")
    const [action, setAction] = useState(null)

    useEffect(() => {
        if(customerId){
            setUrl(URL_UPDATE_CUSTOMER_ADDRESS(customerId, address._id)) 
            setAction(updateCustomerAddress)
        } 
        else if(merchantId){
            setUrl(URL_UPDATE_MERCHANT_ADDRESS(merchantId, address._id))
            setAction(updateMerchantAddress)
        } 
        else if(adminId) {
            setUrl(URL_UPDATE_ADMIN_ADDRESS(adminId, address._id))
            setAction(updateAdminAddress)
        }
    },[customerId, adminId, merchantId, address])

    const updateAddress = async (e) => {
        e.preventDefault()
        setIdle()
        setLoading()
        let data = {
            _id : address._id,
            city : city,
            street : streetInput.current.value,
            number : houseNumberInput.current.value,
        }
        console.log(data)
        try {
            await Axios.put(url, data,
            {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch({...action, payload : {address : data }})
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
        if(e) e.preventDefault()
        setIdle()
        if(attachCancel) attachCancel()
    }

    return (
        <div className="update-address">

            <AlertError err_message={error_message}/>
            {
                loading && (<Loading/>)
            }

            <AlertSuccess show={success} >
                Address has been updated!
            </AlertSuccess>

            <Form 
                className="margin-vertical-small"
                ref={formUpdate} 
                id={"form-update-address"} 
                method="POST">
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
                <ButtonGroupsRight>
                    <ButtonOutlineBlackMedium 
                    event={cancel}
                    id={"btn-cancel"}
                    className="margin-right-small">
                        CANCEL
                    </ButtonOutlineBlackMedium>
                    <ButtonBlackMedium
                    id={"btn-update"}
                     event={updateAddress} className="margin-right-small">
                        UPDATE
                    </ButtonBlackMedium>
                </ButtonGroupsRight>
            </Form>
        </div>
    )
}

export default UpdateAddress