import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { URL_UPDATE_ADMIN_ADDRESS, URL_UPDATE_CUSTOMER_ADDRESS, URL_UPDATE_MERCHANT_ADDRESS } from '../../api/api';
import { useReponse } from '../customs_hooks/useResponse';


import { Row, Col } from '../../layout/row';
import { InputText, Form } from '../../components/form';
import Loading from '../../components/loading';
import { AlertSuccess } from '../../components/alert';
import Section from '../../components/section';
import { ButtonGroupsRight, ButtonOutlineBlackMedium, ButtonBlackMedium } from '../../components/button';
import ErrorPage from '../error/error_page';

import { updateAdminAddress } from '../admin/admin_slice'
import { updateCustomerAddress } from '../customer/customer_slice';
import { updateMerchantAddress } from '../merchant/merchant_slice';

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
        httpCode, 
        errors,
        setLoading,
        setSuccess,
        setError,
        setIdle
     } = useReponse() 

    let formUpdate = useRef()
    let cityInput = useRef()
    let streetInput = useRef()
    let houseNumberInput = useRef()
    let postalCodeInput = useRef()
    useEffect(() => {
        cityInput.current.value = address.city
        streetInput.current.value = address.street
        houseNumberInput.current.value = address.number
        postalCodeInput.current.value = address.postal_code
    },[address])

    if(!loading && !success && !httpCode){
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
        setLoading()
        let data = {
            _id : address._id,
            city : cityInput.current.value,
            street : streetInput.current.value,
            number : houseNumberInput.current.value,
            postal_code : postalCodeInput.current.value
        }
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
        <>
            {
                (httpCode && httpCode != 400) ? <ErrorPage httpCode={httpCode}/> : ""
            }
            {
                loading && (<Loading/>)
            }

            <AlertSuccess show={success} >
                Address has been updated!
            </AlertSuccess>

            <Form 
                ref={formUpdate} 
                id={"form-update-address"} 
                method="POST">
                <Row>
                    <Col>
                        <InputText 
                            ref={cityInput}
                            name="city"
                            label="City :"
                            placeholder="city"
                            error={errors["City"]}/>
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
                        <InputText 
                            ref={postalCodeInput}
                            name="postalCode"
                            label="Postal Code :"
                            placeholder="postal code"
                            error={errors["PostalCode"]}/>
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
                     event={updateAddress} className="margin-right-small">
                        UPDATE
                    </ButtonBlackMedium>
                </ButtonGroupsRight>
            </Form>
        </>
    )
}

export default UpdateAddress