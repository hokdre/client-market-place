import React, { useRef } from 'react';
import { URL_UPDATE_CUSTOMER_PASSWORD } from '../../api/api';
import Axios from 'axios';

import { Form, FormButtonsRight, InputPassword } from '../../components/form';
import { ButtonBlackMedium } from '../../components/button';
import { AlertSuccess } from '../../components/alert';
import Loading from '../../components/loading';
import ErrorPage from '../error/error_page';
import { useReponse } from '../customs_hooks/useResponse';

const UpdatePasswordCustomer = props => {
    let { customerId } = props

    let form = useRef()
    let passwordInput = useRef()
    let rePasswordInput = useRef()

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

    const reset = (e) => {
        if(e) e.preventDefault()
        if(form) form.current.reset()
    }
     
    const handleUpdate = async (e) => {
        if(e) e.preventDefault()
        alert("Nakal ya.. ")
        return
        e.preventDefault()
        setLoading()
        try{
            let data = {
               password : passwordInput.current.value,
               re_password : rePasswordInput.current.value
            }
            await Axios.put(URL_UPDATE_CUSTOMER_PASSWORD(customerId),data,{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            reset()
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
        {
            httpCode && httpCode != 400 ? 
                <ErrorPage httpCode={httpCode}/> : ""
        }
        {
            loading && <Loading/>
        }
        <AlertSuccess show={success}>Password is success updated</AlertSuccess>
        <Form ref={form} id={"form-update-password"} method="POST">
            <InputPassword
                ref={passwordInput}
                name="password"
                label="New Password"
                placeholder="new password"
                error={errors["Password"]}
                />
            <InputPassword
                ref={rePasswordInput}
                name="rePassword"
                label="Retype New Password"
                placeholder="retype new password"
                error={errors["RePassword"]}
                />
            <FormButtonsRight>
                <ButtonBlackMedium event={handleUpdate} >Update</ButtonBlackMedium>
            </FormButtonsRight>
        </Form>
        </>
    )
}

export default UpdatePasswordCustomer;