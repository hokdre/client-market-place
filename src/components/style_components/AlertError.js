import React, { useEffect, useState } from 'react'
import PopUpError from './PopUpError'
import InternalServerMessage from '../../features/error/internal_page'

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

const AlertError = props => {
    let { 
        err_message="", 
        conflict_message = "",
        not_found_message="",
        redirect_link="",
        attach_cancel
    } = props

    let [show, setShow] = useState(false)
    let open = () => setShow(true)
    let close = () =>{
        setShow(false)
        if(attach_cancel) attach_cancel()
    } 
    useEffect(() => {
        if(err_message && err_message !== ERR_VALIDATION) open()
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
            message = InternalServerMessage
        }
    }

    let isSecurityIssues = (err_message === ERR_NOT_AUTHORIZE) || (err_message === ERR_NOT_AUTHENTICATE)

    return (
        <>
        {
            show && (
                <>
                {
                   isSecurityIssues ? 
                    ( 
                        <PopUpError 
                            redirect_link={redirect_link} 
                            err_message={err_message} 
                            conflict_message = {conflict_message}
                            not_found_message= {not_found_message}
                            attach_cancel= {attach_cancel}/>
                    )
                    :
                    (
                        <div className="alert alert--error">
                            <span className="alert__message">
                                <i className="alert__icon fa fa-times">
                                </i>
                                <strong>Gagal !</strong>
                                { message }
                            </span>
                            <span className="alert__close" 
                                onClick={()=>close()}>&times;
                            </span>
                        </div>
                    ) 
                }
                </>
            )
        }
        </>
        
    )
}

export default AlertError