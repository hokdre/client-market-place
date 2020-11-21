import React, {useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    registerCustomerAsyncThunk,
    selectResponseRegister,
    resetResponseRegister
} from './customer_slice';

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
import AutoCompCity from '../../components/logic_components/auto_city';
import AlertError from '../../components/style_components/AlertError';

const FormAddCustomer = () => {
    let dispatch = useDispatch()
    let { error_message, errors, loading, success} = useSelector(selectResponseRegister)

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
    let streetInput = useRef()
    let houseNumberInput = useRef()
    let bornInput = useRef()
    let birthDayInput = useRef()
    let phoneInput = useRef()
    let genderInputMale = useRef()
    let genderInputFemale = useRef()
    let [city, setCity] = useState({})
    


    const submit = (e) => {
        dispatch(resetResponseRegister())

        e.preventDefault()
        dispatch(registerCustomerAsyncThunk({
            name : nameInput.current.value,
            email : emailInput.current.value,
            password : passwordInput.current.value,
            rePassword : rePasswordInput.current.value,
            addresses : [{
                street : streetInput.current.value,
                number : houseNumberInput.current.value,
                city : city
            }],            
            born : bornInput.current.value,
            birthDay : birthDayInput.current.value ? birthDayInput.current.value : null,
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

   let fieldsErr = {
       "Name" : "",
       "Email" : "",
       "Password" : "",
       "RePassword" : "",
       "CityName" : "",
       "PostalCode" : "",
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
            <AlertError
                err_message={error_message}
                conflict_message=""
                not_found_message=""
                redirect_link=""
                />
            <AlertSuccess show={success} >Customer Success Registered</AlertSuccess>
                    
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
                <AutoCompCity
                    errors={fieldsErr}
                    selectedCity={city}
                    setCity={setCity}/>
                <Row>
                    <Col>
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

export default FormAddCustomer;