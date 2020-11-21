import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ValidateAsAdmin = props => {
    let loginType = localStorage.getItem("loginType")
    let { component, path } = props 

    if ("ADMIN" !== loginType ) {
        return (<Redirect to={{pathname : `/${loginType.toLocaleLowerCase()}s`}} />)
    }

    return (<Route  path={path} {...props} render={component}/>)
}


export const ValidateAsCustomer = props => {
    let loginType = localStorage.getItem("loginType")
    let { comp : Component , path, ...rest } = props 

    if ("CUSTOMER" !== loginType ) {
        return (<Redirect to={{pathname : `/${loginType.toLocaleLowerCase()}s`}} />)
    }
    return (
    <Route 
        {...rest} 
        path={path} 
        render={props => (<Component {...props}/>)}/>
    )
}

export const ValidateAsMerchant = props => {
    let loginType = localStorage.getItem("loginType")
    let merchantId = localStorage.getItem("merchantID")
    let { comp : Component, path, ...rest } = props 

    if("CUSTOMER" !== loginType || !merchantId){
        return (<Redirect to={{pathname : `/${loginType.toLocaleLowerCase()}s`}} />)
    }

    return (
    <Route 
        {...rest}
        path={path} 
        render={(props) => (<Component {...props}/>)}/>
    )
}