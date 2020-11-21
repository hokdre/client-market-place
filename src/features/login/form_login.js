import React, {useState, unwrapResult, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link, Redirect, useHistory
}
from 'react-router-dom';

import {
    Form, 
    InputPassword,
    InputText,
} from '../../components/UI_components/form';
import { ButtonBlackMedium } from '../../components/UI_components/button';


import {
    logIn,
    LOGIN_ADMIN,
    LOGIN_CUSTOMER, 
    selectIsLogin,
} from './login_slice';
import { H2 } from '../../components/UI_components/heading';
import ErrorPage from '../error/error_page';
import Loading from '../../components/UI_components/loading';
import { useReponse } from '../customs_hooks/useResponse';
import Axios from 'axios';
import { URL_LOGIN_CUSTOMER, URL_LOGIN_ADMIN } from '../../api/api';
import PopUpError from '../../components/style_components/PopUpError';


const FormTitle = props => {
    let { change , type } = props 

    let otherOption = LOGIN_CUSTOMER
    if (type === LOGIN_CUSTOMER) {
        otherOption = LOGIN_ADMIN
    }

    const changeType = () => {
       change(otherOption)
    }

    return (
    <>
    <H2 className="login_title heading-secondary">
        Login sebagai <span className="login__type">{props.type}</span> 
    </H2>
    <p className="login_text paragraph">
        Don't have an account? Register or  
         login as <span onClick={() => changeType()} className="login__link"> {otherOption} </span> 
    </p>
    </>)
}


const FormLogin = (props) => {
    const history = useHistory()
    const isLogin = useSelector(selectIsLogin)
    const logintype = localStorage.getItem("loginType")
    if (isLogin) {
        if(logintype === "CUSTOMER") history.replace(`/`)
        if(logintype === "ADMIN") history.replace(`/transactions/admin`)
    }
    
    const dispatch = useDispatch()
    const [loginAs , setLoginAs] = useState("CUSTOMER")    
    const { loading, error_message, errors, setError, setSuccess, setLoading, setIdle } = useReponse()

    const emailInput = useRef()
    const passwordInput = useRef()


    const handleLogin = async (e) => {
      setIdle()

       if (e) e.preventDefault()
       let url = URL_LOGIN_CUSTOMER()
       if(loginAs === "ADMIN") url = URL_LOGIN_ADMIN()
       let data = {
           email : emailInput.current.value,
           password : passwordInput.current.value
       }
       setLoading()
       try{
           let response = await Axios.post(url, data)
           let {credential , token } = response.data.data
           dispatch(logIn({ credential , token }))
           setSuccess()
           setTimeout(() => setIdle(), 3000)
       }catch(error){
           setError(error)
       }
    }


    return (
            <section className="section-login">
                <div className={"login"}>
                    <PopUpError
                        err_message={error_message}
                        />
                    {
                        loading && <Loading/>
                    }
                    <FormTitle type={loginAs} change={setLoginAs}/>
                    <div className="login__form">
                        <Form method="POST">
                                <InputText 
                                    name="email"
                                    invalid={""}
                                    placeholder="email"
                                    error={errors["Email"]}
                                    ref={emailInput}/>
                                <InputPassword 
                                    name="password"
                                    invalid={""}
                                    placeholder="password"
                                    error={errors["Password"]}
                                    ref={passwordInput}/>
                                <ButtonBlackMedium event={handleLogin}>
                                    LOGIN
                                </ButtonBlackMedium>
                        </Form>
                    </div>
                </div>       
            </section>
    )
}

export default FormLogin;