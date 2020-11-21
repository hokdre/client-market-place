import React from 'react';
import Navbar from '../../layout/navbar';
import FormLogin from './form_login';

const LoginPage = () => {
    return (
        <div className="page-login">
            <Navbar/>
            <FormLogin/>
        </div>
    )
}

export default LoginPage