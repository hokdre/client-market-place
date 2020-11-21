import React, {useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    registerAdminAsyncThunk,
    selectResponseRegister,
    resetResponseRegister
} from './admin_slice';

import ErrorPage from '../error/error_page';
import Loading from '../../components/UI_components/loading';
import { Row, Col } from '../../layout/row';

import { 
    InputText,
    InputRadio,
    InputDate,
    InputPassword,
    Form
} from '../../components/UI_components/form';
import { ButtonTextBlackMedium, ButtonBlackMedium, ButtonGroupsBetween } from '../../components/UI_components/button';
import { H3 } from '../../components/UI_components/heading';
import { AlertSuccess } from '../../components/UI_components/alert';

const FormAddAdmin = () => {
    let dispatch = useDispatch()
    let { httpCode, errors, loading, success} = useSelector(selectResponseRegister)

    useEffect(() => {
        return () => {
            dispatch(resetResponseRegister())
        }
    },[])

    let formRef = useRef()
    let nameInput = useRef()
    let emailInput = useRef()
    let passwordInput = useRef()
    let rePasswordInput = useRef()
    let cityInput = useRef()
    let streetInput = useRef()
    let houseNumberInput = useRef()
    let postalCodeInput = useRef()
    let bornInput = useRef()
    let birthDayInput = useRef()
    let phoneInput = useRef()
    let genderInputMale = useRef()
    let genderInputFemale = useRef()
    


    const submit = (e) => {
        e.preventDefault()
        dispatch(registerAdminAsyncThunk({
            name : nameInput.current.value,
            email : emailInput.current.value,
            password : passwordInput.current.value,
            rePassword : rePasswordInput.current.value,
            city : cityInput.current.value,
            street : streetInput.current.value,
            houseNumber : houseNumberInput.current.value,
            postalCode : postalCodeInput.current.value,
            born : bornInput.current.value,
            birthDay : birthDayInput.current.value ? birthDayInput.current.value : Date.now(),
            phone : phoneInput.current.value,
            gender : genderInputMale.current.checked ? 
                genderInputMale.current.value :  
                genderInputFemale.current.checked ? 
                    genderInputFemale.current.value :
                    ""
        }))
    }

    const reset = (e) => {
        if (e) e.preventDefault()
        if(formRef) formRef.current.reset()
    } 

   if(httpCode && httpCode != 400){
       return (<ErrorPage httpCode={httpCode}/>)
   } 

   let fieldsErr = {
       "Name" : "",
       "Email" : "",
       "Password" : "",
       "RePassword" : "",
       "City" : "",
       "Street" : "",
       "Number" : "",
       "PostalCode" : "",
       "Born" : "",
       "BirthDay" : "",
       "Gender" : ""
   }
   errors.forEach(err => {
       fieldsErr[err.field] = err.message 
   })

   if(success){
       reset()
   }

    return (
        <>
        {
            loading && (<Loading/>)
        }

            <AlertSuccess show={success} >Admin Success Registered</AlertSuccess>
                    
            <Form ref={formRef} className="form-admin">
                <H3 className="form-admin__title">Basic Info</H3>
                <Row>
                    <Col>
                        <InputText 
                            ref={nameInput}
                            name="name"
                            label="Name :"
                            placeholder="name"
                            error={fieldsErr["Name"]}/>
                        <InputText 
                            ref={emailInput}
                            name="email"
                            label="Email :"
                            placeholder="example@gmail.com"
                            error={fieldsErr["Email"]}/>
                        <InputText 
                            ref={phoneInput}
                            name="phone"
                            label="Phone Number :"
                            placeholder="phone number"
                            error={fieldsErr["Phone"]}/>
                        <InputRadio
                            ref={[genderInputFemale,genderInputMale]}
                            name="gender"
                            label="Gender :"
                            options={[
                                {name : "Female", value: "F"},
                                {name : "Male", value: "M"}
                            ]}
                            error={fieldsErr["Gender"]}/>
                    </Col>
                    <Col>
                        <InputText 
                            ref={bornInput}
                            name="born"
                            label="Born Place :"
                            placeholder="born place"
                            error={fieldsErr["Born"]}/>
                        <InputDate 
                            ref={birthDayInput}
                            name="birthDay"
                            label="Birth Day :"
                            error={fieldsErr["BirthDay"]}/>
                        <InputPassword 
                            ref={passwordInput}
                            name="password"
                            label="Password :"
                            placeholder="password"
                            error={fieldsErr["Password"]}/>
                        <InputPassword 
                            ref={rePasswordInput}
                            name="rePassword"
                            label="Re Password :"
                            placeholder="re password"
                            error={fieldsErr["RePassword"]}/>
                    </Col>
                </Row>
                <H3 className="form-admin__title">Addresses</H3>
                <Row>
                    <Col>
                        <InputText 
                            ref={cityInput}
                            name="city"
                            label="City :"
                            placeholder="city"
                            error={fieldsErr["City"]}/>
                        <InputText 
                            ref={streetInput}
                            name="street"
                            label="Street :"
                            placeholder="street"
                            error={fieldsErr["Street"]}/>
                    </Col>
                    <Col>
                        <InputText 
                            ref={houseNumberInput}
                            name="houseNumber"
                            label="House Number :"
                            placeholder="house number"
                            error={fieldsErr["Number"]}/>
                        <InputText 
                            ref={postalCodeInput}
                            name="postalCode"
                            label="Postal Code :"
                            placeholder="postal code"
                            error={fieldsErr["PostalCode"]}/>
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

export default FormAddAdmin;