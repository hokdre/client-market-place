import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { URL_UPDATE_CUSTOMER_BASIC_INFO } from '../../api/api';
import { selectCustomerBasicInfo, updateCustomerBasicInfo } from './customer_slice';
import Axios from 'axios';
import moment from 'moment';

import { Form, InputDate, InputText, InputRadio, FormButtonsRight } from '../../components/UI_components/form';
import { Row, Col } from '../../layout/row';
import { ButtonBlackMedium } from '../../components/UI_components/button';
import { AlertSuccess } from '../../components/UI_components/alert';
import Loading from '../../components/UI_components/loading';
import ErrorPage from '../error/error_page';
import { useReponse } from '../customs_hooks/useResponse';
import UpdateAvatarCustomer from './update_avatar';
import AlertError from '../../components/style_components/AlertError';

const UpdateCustomerBasicInfo = props => {
    let {customerId } = props
    let dispatch = useDispatch()

    let basicInfo = useSelector(selectCustomerBasicInfo)
    let nameInput = useRef()
    let emailInput = useRef()
    let bornInput = useRef()
    let birthDayInput = useRef()
    let phoneInput = useRef()
    let genderInputMale = useRef()
    let genderInputFemale = useRef()
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
        nameInput.current.value = basicInfo.name
        emailInput.current.value = basicInfo.email
        bornInput.current.value = basicInfo.born
        phoneInput.current.value = basicInfo.phone
        birthDayInput.current.value = moment(basicInfo.birth_day).format("YYYY-MM-DD")
        if(basicInfo.gender === "M" || basicInfo.gender == "m"){
            genderInputMale.current.checked = true
        }else{
            genderInputFemale.current.checked = true
        }
    },[basicInfo])

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading()
        try{
            let data = {
                name : nameInput.current.value,
                born : bornInput.current.value,
                birth_day : moment(birthDayInput.current.value).format(),
                phone : phoneInput.current.value,
                gender : genderInputMale.current.checked ? 
                genderInputMale.current.value :  
                genderInputFemale.current.checked ? 
                    genderInputFemale.current.value :
                    ""
            }
            await Axios.put(URL_UPDATE_CUSTOMER_BASIC_INFO(basicInfo._id),data,{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            dispatch(updateCustomerBasicInfo({ basicInfo : data }))
            setSuccess()
            setTimeout(() =>{
                setIdle()
            }, 3000)
        }catch(error){
            setError(error)
        }
    }
    
    return (
        <>
        <AlertError err_message={error_message}/>
        {
            loading && <Loading/>
        }
        <AlertSuccess show={success}>Data is success updated</AlertSuccess>
        <Form method="POST">
            <Row>
                <Col className="margin-right-medium">
                    <UpdateAvatarCustomer avatar={basicInfo.avatar} customerId={customerId}/>
                </Col>
                <Col className="margin-right-medium">
                    <InputText 
                        ref={nameInput}
                        name="name"
                        label="Name :"
                        placeholder="name"
                        error={errors["Name"]}/>
                    <InputText 
                        ref={emailInput}
                        disabled={true}
                        name="email"
                        label="Email :"
                        placeholder="example@gmail.com"
                        error={errors["Email"]}/>
                    <InputText 
                        ref={phoneInput}
                        name="phone"
                        label="Phone Number :"
                        placeholder="phone number"
                        error={errors["Phone"]}/>
                </Col>
                <Col>
                    <InputRadio
                            ref={[genderInputFemale,genderInputMale]}
                            name="gender"
                            label="Gender :"
                            options={[
                                {name : "Female", value: "F"},
                                {name : "Male", value: "M"}
                            ]}
                            error={errors["Gender"]}/>
                    <InputText 
                        ref={bornInput}
                        name="born"
                        label="Born Place :"
                        placeholder="born place"
                        error={errors["Born"]}/>
                    <InputDate 
                        ref={birthDayInput}
                        name="birthDay"
                        label="Birth Day :"
                        error={errors["BirthDay"]}/>
                </Col>
            </Row>
            <FormButtonsRight>
                <ButtonBlackMedium event={handleUpdate} >Update</ButtonBlackMedium>
            </FormButtonsRight>
        </Form>
        </>
    )
}

export default UpdateCustomerBasicInfo;