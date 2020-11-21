import React, { useState, useEffect } from 'react'
import { PopUpEmpty } from '../UI_components/popup'
import { useHistory } from 'react-router-dom'
import { ButtonBlackSmall } from '../UI_components/button'

/**
 * CLIENT CUSTOMIZE MESSAGE
*/
const ERR_CONFLICT = "Item Is Already Exist"
const ERR_NOT_FOUND = "Item Is Not Exist"

/**
 * DEFAULT MESSAGE 
*/
const ERR_INTERNAL = "Internal Server Error"
const INTERNAL_MESSAGE = " Maaf, service sedang tidak tersedia. Mohon coba beberapa saat lagi"
const ERR_BAD_PARAM = "Param Is Not Valid"
const BAD_PARAM_MESSAGE = " Maaf, terjadi kesalahan pada saat memproses data. Mohon periksa kembali data yang anda masukan."

/**
 * PopUp and Redirect
*/
const ERR_NOT_AUTHORIZE = "Credential Is Not Valid"
const NOT_AUTHORIZE_MESSAGE = " Maaf, anda tidak memiliki hak akses untuk menggunakan service ini"
const ERR_NOT_AUTHENTICATE = "Token Is Not Valid"
const NOT_AUTHENTICATE_MESSAGE = " Maaf, data login anda tidak valid. Mohon lakukan login kembali"

/**
 * Not Showing
 * 
*/
const ERR_VALIDATION = "ENTITY VALIDATION"
const ERR_LOGIN = "LOGIN FAILED"

const PopUpError = props => {
    let { 
        err_message="", 
        conflict_message = "",
        not_found_message="",
        redirect_link="",
        attach_cancel
    } = props

    let history = useHistory()

    let isSecurityIssues = (err_message === ERR_NOT_AUTHORIZE) || (err_message === ERR_NOT_AUTHENTICATE) 

    let [show, setShow] = useState(false)
    let open = (e) => {
        if(e) e.preventDefault()
        setShow(true)
    }
    let close = (e) =>{
        if(e) e.preventDefault()
        setShow(false)
        if(attach_cancel) attach_cancel()
        if(isSecurityIssues && redirect_link) history.replace(redirect_link)
    } 

    useEffect(() => {
        if(err_message && err_message !== ERR_VALIDATION && err_message !== ERR_LOGIN) open()
    }, [err_message])

    let message = ""
    switch(err_message) {
        case ERR_CONFLICT : {
            message = conflict_message
            break;
        }
        case ERR_NOT_FOUND : {
            message = not_found_message
            break;
        }
        case ERR_INTERNAL : {
            message = INTERNAL_MESSAGE
            break;
        }
        case ERR_BAD_PARAM : {
            message = BAD_PARAM_MESSAGE
            break;
        }
        case ERR_NOT_AUTHENTICATE : {
            message = NOT_AUTHENTICATE_MESSAGE
            break;
        }
        case ERR_NOT_AUTHORIZE : {
            message = NOT_AUTHORIZE_MESSAGE
            break;
        }
        default :{
            message = INTERNAL_MESSAGE
        }
    }

    

    return (
       <PopUpEmpty
        style={{width : "30%" }}
        show={show}
        close={close}>
           <div className="popup-error">
               <div className="popup-error__flex">
                    <div className="popup-error__icon">
                            <i className="alert__icon fa fa-times"></i>
                    </div>
                    <div className="popup-error__message">
                        {message}
                    </div>
               </div>
               <div className="popup-error__buttons">
                   <ButtonBlackSmall event={close}> Ok </ButtonBlackSmall>
               </div>
           </div>
       </PopUpEmpty>
    )
}

export default PopUpError