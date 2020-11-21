import { useState } from 'react';
import {format_error } from './helper_error';

export const useReponse = () => {
    const [response, setResponse] = useState({
        loading : false,
        success : false,
        error_message : "",
        httpCode : "",
        errors : {}
    })

    const setIdle = () => {
        setResponse({
            loading : false,
            success : false,
            error_message : "",
            httpCode : "",
            errors : {}
        })
    }

    const setLoading = () => {
        setResponse({
            loading : true,
            success : false,
            error_message : "",
            httpCode : "",
            errors : {}
        })
    }

    const setError = (error) => {
        let err = {}
        let errResponse = format_error(error)
        errResponse.errors.forEach(e => {
            err[e.field] = e.message
        })
        
        setResponse({
            loading : false,
            success : false,
            error_message : errResponse.error_message,
            httpCode : errResponse.httpCode,
            errors : err
        })
    }

    const setSuccess = () => {
        setResponse({
            loading : false,
            success : true,
            error_message : "",
            httpCode : "",
            errors : {}
        })
    }

    return {
        loading : response.loading,
        success : response.success,
        error_message : response.error_message,
        httpCode : response.httpCode,
        errors : response.errors,
        setLoading : setLoading,
        setError : setError,
        setSuccess : setSuccess,
        setIdle : setIdle
    }
}


