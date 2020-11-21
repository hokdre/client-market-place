import React, { useRef } from 'react';
import { URL_UPDATE_ADMIN_PASSWORD } from '../../api/api';
import Axios from 'axios';

import { Form, FormButtonsRight, InputPassword } from '../../components/UI_components/form';
import { H2 } from '../../components/UI_components/heading';
import { ButtonBlackMedium } from '../../components/UI_components/button';
import { AlertSuccess } from '../../components/UI_components/alert';
import Loading from '../../components/UI_components/loading';
import ErrorPage from '../error/error_page';
import { useReponse } from '../customs_hooks/useResponse';

const UpdatePasswordAdmin = props => {
    let { adminId } = props

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
        setLoading()
        try{
            let data = {
               password : passwordInput.current.value,
               re_password : rePasswordInput.current.value
            }
            await Axios.put(URL_UPDATE_ADMIN_PASSWORD(adminId),data,{
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

export default UpdatePasswordAdmin;